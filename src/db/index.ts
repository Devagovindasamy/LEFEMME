import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: ReturnType<typeof drizzle>;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getPool(): Pool | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim().length === 0) {
    return null;
  }

  if (globalForDb.__arenaNextJsPostgresqlPool) {
    return globalForDb.__arenaNextJsPostgresqlPool;
  }

  if (!_pool) {
    _pool = new Pool({
      connectionString: databaseUrl,
    });
    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = _pool;
    }
  }

  return _pool;
}

export function getDb(): ReturnType<typeof drizzle> | null {
  const poolInstance = getPool();
  if (!poolInstance) {
    return null;
  }

  if (globalForDb.__arenaNextJsPostgresqlDb) {
    return globalForDb.__arenaNextJsPostgresqlDb;
  }

  if (!_db) {
    _db = drizzle(poolInstance);
    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlDb = _db;
    }
  }

  return _db;
}

/**
 * Proxy export for `db` so existing call sites (`db.select()`, `db.insert()`, etc.)
 * continue working seamlessly when DATABASE_URL is set, but throw an informative runtime error
 * ONLY when a database operation is actually invoked without DATABASE_URL configured.
 */
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    const instance = getDb();
    if (!instance) {
      throw new Error("DATABASE_URL is not configured. Database operations are unavailable.");
    }
    const val = Reflect.get(instance as object, prop, receiver);
    if (typeof val === "function") {
      return val.bind(instance);
    }
    return val;
  },
});

/**
 * Proxy export for `pool` for raw queries in seed/health checks.
 */
export const pool = new Proxy({} as Pool, {
  get(_target, prop, receiver) {
    const instance = getPool();
    if (!instance) {
      throw new Error("DATABASE_URL is not configured. Database pool is unavailable.");
    }
    const val = Reflect.get(instance as object, prop, receiver);
    if (typeof val === "function") {
      return val.bind(instance);
    }
    return val;
  },
});
