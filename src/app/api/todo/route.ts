import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const prisma = new PrismaClient();
const CACHE_KEY = "todos";

export async function GET() {
  // キャッシュをチェック
  const cachedTodos = await redis.get(CACHE_KEY);
  if (cachedTodos) {
    return NextResponse.json(JSON.parse(cachedTodos));
  }

  // DB からデータ取得
  const todos = await prisma.todo.findMany();

  // Redis にキャッシュ保存（有効期限 60 秒）
  await redis.set(CACHE_KEY, JSON.stringify(todos), "EX", 60);

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();

  // データをDBに保存
  const todo = await prisma.todo.create({ data: { title } });

  // キャッシュを削除（最新のデータを取得させるため）
  await redis.del(CACHE_KEY);

  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  // データを削除
  await prisma.todo.delete({ where: { id } });

  // キャッシュを削除（最新のデータを取得させるため）
  await redis.del(CACHE_KEY);

  return NextResponse.json({}, { status: 204 });
}
