export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  can_read?: boolean;
  can_write?: boolean;
  can_delete?: boolean;
}
