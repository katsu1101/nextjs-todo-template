import { DatabaseService } from "@/lib/database";
import { LoggerService } from "@/lib/logger";
import { CacheService } from "@/lib/cache";
import { NextResponse } from "next/server";

const CACHE_KEY = "todos"; // キャッシュキーを統一

export async function GET() {
  const db = DatabaseService.getPrismaClient();
  LoggerService.log("Fetching todos...");

  // キャッシュを確認
  const cachedTodos = await CacheService.get(CACHE_KEY);
  if (cachedTodos) {
    LoggerService.log("Cache hit!");
    return NextResponse.json(JSON.parse(cachedTodos));
  }

  // DBから取得
  const todos = await db.todo.findMany();

  // キャッシュ保存（60秒間）
  await CacheService.set(CACHE_KEY, JSON.stringify(todos), 60);

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const db = DatabaseService.getPrismaClient();
  const { title } = await req.json();

  LoggerService.log(`Adding todo: ${title}`);

  // データをDBに保存
  const todo = await db.todo.create({ data: { title } });

  // キャッシュを削除
  await CacheService.del(CACHE_KEY);

  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(req: Request) {
  const db = DatabaseService.getPrismaClient();
  const { id } = await req.json();

  LoggerService.log(`Deleting todo with id: ${id}`);

  // データを削除
  await db.todo.delete({ where: { id } });

  // キャッシュを削除
  await CacheService.del(CACHE_KEY);

  return NextResponse.json({}, { status: 204 });
}
