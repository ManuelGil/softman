import { AuthCredentialsModel } from "./auth-credentials.model";
import { RoleModel } from "./role.model";

export interface UserModel {
  id: number;
  document: string;
  password: string;
  email: string;
  fullName: string;
  role: RoleModel;
  credentials: AuthCredentialsModel;
}
