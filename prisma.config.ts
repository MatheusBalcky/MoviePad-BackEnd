import dotenv from 'dotenv';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig } from '@prisma/orm-postgres/config';

dotenv.config({ quiet: true });

export default definePrismaConfig({
  skills: { agents: ['agents'] },
  orm: defineConfig({
    contract: 'prisma/schema.prisma',
    output: 'src/database/generated',
    migrations: { dir: 'prisma/migrations-v8' },
    db: { connection: process.env.DATABASE_URL ?? '' }
  })
});
