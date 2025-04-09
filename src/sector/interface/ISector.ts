import { Employee } from '@prisma/client';

export default interface ISector {
  id?: string;
  name: string;
  employees?: Employee | Employee[];
}
