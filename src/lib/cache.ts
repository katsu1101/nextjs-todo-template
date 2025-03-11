import Redis from "ioredis";
import { LoggerService } from "@/lib/logger";

class CacheService {
  private static client: Redis | null = null;

  static getClient(): Redis {
    if (!this.client) {
      this.client = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      });
    }
    return this.client;
  }

  static async get(key: string): Promise<string | null> {
    const client = this.getClient();
    try {
      return await client.get(key);
    } catch (error) {
      LoggerService.log(`Cache get error: ${error}`);
      return null;
    }
  }

  static async set(key: string, value: string, ttl: number = 60): Promise<void> {
    const client = this.getClient();
    try {
      await client.set(key, value, "EX", ttl);
    } catch (error) {
      LoggerService.log(`Cache set error: ${error}`);
    }
  }

  static async del(key: string): Promise<void> {
    const client = this.getClient();
    try {
      await client.del(key);
    } catch (error) {
      LoggerService.log(`Cache delete error: ${error}`);
    }
  }
}

export { CacheService };
