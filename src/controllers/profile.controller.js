import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUserById, deleteUserById } from "../services/user.service.js";
import { AppDataSource } from "../config/configDb.js"; 
import { User } from "../entities/user.entity.js"; 

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getPrivateProfile(req, res) {
  try {
    const user = req.user;
    const userRepository = AppDataSource.getRepository(User);
    const fullUser = await userRepository.findOne({
      where: { id: user.sub },
      select: ["id", "email", "password"]
    });

    if (!fullUser) {
      return handleErrorClient(res, 404, "No registrado");
    }

    handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
      message: `¡Hola, ${fullUser.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
      userData: {
        id: fullUser.id,
        email: fullUser.email,
        password: fullUser.password
      },
    });
  } catch (error) {
    return handleErrorServer(res, 500, "Error al obtener el perfil", error.message);
  }
}





