import { UserDTO } from "../dto/UserDTO";

export default interface UserDAO {
    getUserById(userId: string): Promise<UserDTO>;
    insert(user: UserDTO): Promise<string>;
}