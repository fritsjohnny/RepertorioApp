export interface User {
  id?: number;
  name: string;
  username: string;
  password?: string;
  canInsert?: Date;
  canUpdate?: Date;
  canDelete?: Date;
  createdAt?: Date;
}
