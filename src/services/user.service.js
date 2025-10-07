import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}


export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

export async function updateUserById(id, changes) {
  if (changes.password) {
    changes.password = await bcrypt.hash(changes.password, 10);
  }
  await userRepository.update(id, changes);
  return await userRepository.findOneBy({ id });
}

export async function deleteUserById(id) {
  return await userRepository.delete(id);
}
