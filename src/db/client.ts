import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

type DatabaseGlobals = typeof globalThis & {
  novertraPostgresPool?: Pool;
};

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize the Project Dossier database.");
}

const databaseGlobals = globalThis as DatabaseGlobals;
const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({ connectionString: databaseUrl })
    : (databaseGlobals.novertraPostgresPool ??=
        new Pool({ connectionString: databaseUrl }));

export const db = drizzle(pool, { schema });
export { pool as dbPool };
