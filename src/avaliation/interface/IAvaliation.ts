import { User } from '@prisma/client';

export default interface IAvaliation {
  id?: string;
  user: Partial<User>;
  userId: string;
  score: number;
  comment: string;
}
