import { User } from "../person/person.model";

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  isError: boolean;
  message: string;
  user: User;
}
