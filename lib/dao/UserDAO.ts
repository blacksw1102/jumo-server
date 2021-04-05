import { User } from "../dto/UserDTO";

export default interface UserDAO {
    getUserById(userId: string): Promise<User>;
}