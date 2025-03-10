import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const todo = await prisma.todo.create({ data: { title } });
  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({}, { status: 204 });
}
