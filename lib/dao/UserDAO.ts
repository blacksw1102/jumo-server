import UserModel from "../models/UserModel";

export default interface UserDAO {
    getUserById(userId: string): Promise<UserModel>;
}