import { User } from "./domain/User";
import { UserRepository } from "./infra/database/files/repositories/userRespository";

import hash from "./shared/utils/Hasher";

const repository = new UserRepository();

function findById(id: string) {
  const user = repository.findById(id);

  if (!user) return null;

  return user;
}

function create(name: string, email: string, password: string) {
  if (findById(hash(email)))
    throw new Error(`User with email ${email} already exists`);

  const user = User.create({ name, email, password });

  repository.save(user);

  return user;
}

function remove(id: string) {
  const user = findById(id);

  if (!user) return null;

  user.delete();

  repository.save(user);

  return user;
}

function update(name: string, password: string) {
  const user = findById(hash(name));

  if (!user) return null;

  user.update(user);

  repository.save(user);

  return user;
}

let usr1 = findById(hash("davi"));
console.log(!usr1 && "User not exists");

if (!usr1) usr1 = create("davi", "test@gmail.com", "12");
console.log(usr1.events);
