"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./domain/User");
const userRespository_1 = require("./infra/database/files/repositories/userRespository");
const Hasher_1 = __importDefault(require("./shared/utils/Hasher"));
const repository = new userRespository_1.UserRepository();
function findById(id) {
    const user = repository.findById(id);
    if (!user)
        return null;
    return user;
}
function create(name, email, password) {
    if (findById((0, Hasher_1.default)(email)))
        throw new Error(`User with email ${email} already exists`);
    const user = User_1.User.create({ name, email, password });
    repository.save(user);
    return user;
}
function remove(id) {
    const user = findById(id);
    if (!user)
        return null;
    user.delete();
    repository.save(user);
    return user;
}
function update(name, password) {
    const user = findById((0, Hasher_1.default)(name));
    if (!user)
        return null;
    user.update(user);
    repository.save(user);
    return user;
}
let usr1 = findById((0, Hasher_1.default)("davi"));
console.log(!usr1 && "User not exists");
if (!usr1)
    usr1 = create("davi", "test@gmail.com", "12");
console.log(usr1);
