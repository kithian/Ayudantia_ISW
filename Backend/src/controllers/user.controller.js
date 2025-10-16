import { updateUserById, deleteUserById } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

export class CrudController {
  // PATCH /profile/private
  async updatePrivateProfile(req, res) {
    try {
      // Extraer id del usuario autenticado desde el token JWT
      const userId = req.user?.sub || req.user?.id;
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

  // DELETE /profile/private
  async deletePrivateProfile(req, res) {
    try {
      // Extraer id del usuario autenticado desde el token JWT
      const userId = req.user?.sub || req.user?.id;

      // Validar que no se pase un id por body 
      if (req.body.id || req.query.id) {
        return handleErrorClient(res, 400, "No se permite especificar id para eliminar. Solo puedes eliminar tu propia cuenta.");
      }

      const result = await deleteUserById(userId);
      if (result.affected === 0) {
        return handleErrorClient(res, 404, "Usuario no encontrado.");
      }
      handleSuccess(res, 200, "Perfil eliminado exitosamente", { id: userId });
    } catch (error) {
      handleErrorServer(res, 500, "Error al eliminar el perfil", error.message);
    }
  }

  
  
}
