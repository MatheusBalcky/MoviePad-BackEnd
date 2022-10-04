import { users } from '@prisma/client';

export type userData = Omit<users, 'id' | 'createdAt'>;

export interface ListData {
  userId: number;
  title: string;
  icon: string;
}
