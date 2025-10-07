"use strict";
import Joi from "joi";

export const authQueryValidation = Joi.object({
    email: Joi.string()
        .email() 
        .required() //requerida
        .messages({
            "string.email": "El correo electrónico debe tener un formato válido.",
            "any.required": "El correo electrónico es obligatorio.",
            "string.empty": "El correo electrónico no puede estar vacío.",
        }),



    password: Joi.string()
        .min(4)
        .max(16)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)  //solo numeros y letras
        .required()
        .messages({
            "string.empty": "La contraseña no puede estar vacía.", 
            // any.required: "La contraseña es obligatoria.",
            "string.base": "La contraseña solo puede contener letras y números.",
            "string.min": "La contraseña debe tener al menos 4 caracteres.",
            "string.max": "La contraseña no puede exceder los 16 caracteres.",
            "string.pattern.base": "La contraseña solo puede contener letras y números.",
        })
});