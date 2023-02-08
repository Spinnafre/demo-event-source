"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const User_1 = require("../../../../domain/User");
class UserRepository {
    _state = new Map();
    fileDbPath = node_path_1.default.resolve(__dirname, "..", "..", "db.json");
    static instance = null;
    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        const fileExists = node_fs_1.default.existsSync(this.fileDbPath);
        fileExists ? this.loadFile() : this.writeFile();
    }
    get state() {
        return this._state;
    }
    save(user) {
        this._state.set(user.id, {
            id: user.id,
            events: user.events,
            state: user.endState,
        });
        user.removePendingEvents();
        this.writeFile();
        return this;
    }
    findById(id) {
        const user = this._state.get(id);
        if (!user)
            return null;
        return new User_1.User(user.events);
    }
    loadFile() {
        const data = JSON.parse(node_fs_1.default.readFileSync(this.fileDbPath, "utf-8"));
        this._state = new Map(data);
    }
    writeFile() {
        return node_fs_1.default.writeFileSync(this.fileDbPath, JSON.stringify([...this._state.entries()]));
    }
}
exports.UserRepository = UserRepository;
