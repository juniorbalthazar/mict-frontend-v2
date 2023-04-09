import {Role} from './role';

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string
  gender: string;
  nin: string;
  nif: string;
  enable: boolean;
  email: string;
  phone: string;
  photo: string;
  role: Role;
  accessToken?: string;
}
