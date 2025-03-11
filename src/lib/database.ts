import {ConfigService}  from "@/lib/config";
import { PrismaClient } from "@prisma/client";

export class DatabaseService {
  private static prisma: PrismaClient;

  static getPrismaClient(): PrismaClient {
    if (!this.prisma) {
      this.prisma = new PrismaClient({
        datasources: {
          db: { url: ConfigService.get("DATABASE_URL") },
        },
      });
    }
    return this.prisma;
  }
}
