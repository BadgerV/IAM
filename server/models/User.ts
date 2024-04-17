export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  is_admin: boolean;
  can_read?: boolean;
  can_write?: boolean;
  can_delete?: boolean;
}
