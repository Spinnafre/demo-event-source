import fs from "node:fs";
import path from "node:path";
import { User } from "../../../../domain/User";

class UserRepository {
  private _state = new Map();

  private fileDbPath = path.resolve(__dirname, "..", "..", "db.json");

  static instance = null;

  constructor() {
    if (UserRepository.instance) {
      return UserRepository.instance;
    }

    const fileExists = fs.existsSync(this.fileDbPath);

    fileExists ? this.loadFile() : this.writeFile();
  }

  get state() {
    return this._state;
  }

  save(user: User) {
    this._state.set(user.id, {
      id: user.id,
      events: user.events,
      state: user.endState,
    });

    user.removePendingEvents();

    this.writeFile();

    return this;
  }

  findById(id: string) {
    const user = this._state.get(id) as User;

    if (!user) return null;

    // É função do repositório retornar um dado mapeado
    return new User(user.events);
  }

  loadFile() {
    const data = JSON.parse(fs.readFileSync(this.fileDbPath, "utf-8"));
    this._state = new Map(data);
  }

  writeFile() {
    //Save key:value
    return fs.writeFileSync(
      this.fileDbPath,
      JSON.stringify([...this._state.entries()])
    );
  }
}

export { UserRepository };
