import dotenv from 'dotenv';
import postgres from '@prisma/orm-postgres/runtime';
import { Pool } from 'pg';
import type { Contract } from './generated/contract';
import contractJson from './generated/contract.json';

dotenv.config({ quiet: true });
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = postgres<Contract>({ contractJson, pg: pool });

// Keep the API's UTC Date serialization when the ORM returns timestamp strings.
export function withCreatedAt<T extends { createdAt: string }>(row: T) {
  const timestamp = /(?:Z|[+-]\d{2}:\d{2})$/i.test(row.createdAt)
    ? row.createdAt
    : `${row.createdAt}Z`;
  return { ...row, createdAt: new Date(timestamp) };
}

export default db;
