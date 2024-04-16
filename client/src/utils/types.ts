/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  username: string;
  email: string;
  token: string;

  role?: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface AuthInitialState {
  user: User | null;
  loginError: any;
}

export interface CategoryInitialState {
  fetchedCategories: CategoryData[];
}

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface Options {
  value: string;
  label: string;
}
//options

export interface Data {
  fileName: string;
  name: string;
  email: string;
  size: string;
  lastModified: string;

  type: string;

  selectAll?: any;
}

// export interface FolderType {
//   folderName: string;
//   noOfFiles: number;
//   fileSize?: string;
//   img: string;
// }

export interface ManageAccessFileType {
  request: string;
  dateOfRequest: string;
  statusOfRequest: string;
}

type Role = "admin" | "manager" | "employee";

export interface OverviewData {
  name: string;
  email: string;
  status: string;
  role: Role;

  selectAll?: boolean;
}

export interface PermissionsDataType {
  name: string;
  email: string;
  roleAssigned: string;
  status: string;
  img?: string;
  selectAll?: any;

  role: Role;
}

export interface RecentActivityData {
  image: string;
  activityText: string;
  timeAgo: string;
}

export interface CategoryAccessData {
  category_id: number;
  user_id: number;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
}

// export interface FileData {
//   file_name: string;
//   file_size: string;
//   folder_id: number | null;
//   category_id: number | null;
//   description: string;
//   file: File | any;
// }
export interface FileData {
  id: number;
  user_id: number;
  folder_id: number;
  category_id: number;
  file_name: string;
  file_size: string;
  description: string;
  category_name: string;
  cloud_url: string;
  folder_name: string;
  owner_username: string;
  created_at: string;
  updated_at: string;
  file?: File | null;
}

export interface FileInitialState {
  files: FileData[] | null;
}

export interface FolderType {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FolderInitialState {
  fetchedFolders: FolderType[] | null;
}

export interface FolderDetails {
  folder_id: number;
  user_id: number;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
}

export interface FileDetails {
  file_id: number;
  user_id: number;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
}
