export class UserDTO {
    public id: string;
    public name: string;
    public pw: string;
    public salt: string;
    public tel: number;
    public profile_image?: string;
    public point: number;
    public usercol?: number;
    public birth_date: string;

    constructor(id: string, name: string, pw: string, salt: string, tel: number, profile_image: string, point: number, usercol: number, birth_date: string) {
        this.id = id;
        this.name = name;
        this.pw = pw;
        this.salt = salt;
        this.tel = tel;
        this.profile_image = profile_image;
        this.point = point;
        this.usercol = usercol;
        this.birth_date = birth_date;
    }
}