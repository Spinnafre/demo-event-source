import { User } from "../../../../domain/User";
declare class UserRepository {
    private _state;
    private fileDbPath;
    static instance: null;
    constructor();
    get state(): Map<any, any>;
    save(user: User): this;
    findById(id: string): User | null;
    loadFile(): void;
    writeFile(): void;
}
export { UserRepository };
