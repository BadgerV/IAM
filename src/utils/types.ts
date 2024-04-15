/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  username: string;
  email: string;
  token: string;
}

export interface AuthInitialState {
  user: User | null;
  error: any;
}

export interface LoginCredentials {
  username: string;
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

export interface FolderType {
  folderName: string;
  noOfFiles: number;
  fileSize?: string;
  img: string;
}

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
