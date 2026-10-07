import type { StorageColumnTypes } from '../database/generated/contract';

export type userData = Pick<StorageColumnTypes['public']['users'], 'email' | 'password'>;

export interface ListData {
  userId: number;
  title: string;
  iconList?: string;
}
