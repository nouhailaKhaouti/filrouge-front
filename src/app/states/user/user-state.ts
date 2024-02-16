import { User } from "src/app/domain/user-model";

export interface UserState {
    user : User;
    loading : boolean;
    error : string | null;
}