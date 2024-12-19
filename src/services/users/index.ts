import { crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface UserListResponseData {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface UserParams extends ListRequestParams {}

export interface UserRequestData {
  id?: string;
  name: string;
  email: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export const userService = crud<
  UserRequestData,
  UserRequestData,
  UserListResponseData,
  UserParams,
  UserData
>({ route: 'users' });
