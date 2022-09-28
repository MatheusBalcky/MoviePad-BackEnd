import { users } from '@prisma/client';

export type userData = Omit<users, 'id' | 'createdAt'>;
