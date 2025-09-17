
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUserById, deleteUserById } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
// ...existing code...

  const user = req.user;
  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function updatePrivateProfile(req, res) {
  try {
    const userId = req.user.sub || req.user.id;
    const { email, password } = req.body;

    if (!email && !password) {
      return handleErrorClient(res, 400, "Debes enviar email y/o password para actualizar.");
    }

    const changes = {};
    if (email) changes.email = email;
    if (password) changes.password = password;

    const updatedUser = await updateUserById(userId, changes);
    if (!updatedUser) {
      return handleErrorClient(res, 404, "Usuario no encontrado.");
    }
    handleSuccess(res, 200, "Perfil actualizado exitosamente", { user: updatedUser });
  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar el perfil", error.message);
  }
}

export async function deletePrivateProfile(req, res) {
  try {
    const userId = req.user.sub || req.user.id;
    const result = await deleteUserById(userId);
    if (result.affected === 0) {
      return handleErrorClient(res, 404, "Usuario no encontrado.");
    }
    handleSuccess(res, 200, "Perfil eliminado exitosamente", { id: userId });
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar el perfil", error.message);
  }
}
