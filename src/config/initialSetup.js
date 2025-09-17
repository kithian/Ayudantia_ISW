"use strict";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../configDb.js";
import { User } from "../entities/user.entity.js";

async function encryptPassword(password) {
const saltRounds = 10;
return await bcrypt.hash(password, saltRounds);
}

export async function createUsers() {
    try {
        const createUsers = AppDataSource.getRepository(User);
        const count = await userRepository.count(); 
        if (count > 0) ;

        const now = new Date();

        await Promise.all([
            userRepository.save(userRepository.create({
                email: "correo@prueba.com",
                password: await encryptPassword("password123"),
            })),
            userRepository.save(userRepository.create({
                email: "correo@prueba.com",
                password: await encryptPassword("password123"),
            }))

    ]);

    console.log("Usuarios iniciales creados exitosamente.");
    } catch (error) {  
        console.error("Error al crear usuarios iniciales:", error);
    }

}