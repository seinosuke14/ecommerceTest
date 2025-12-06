"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    // Validar formato de email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Validar longitud de contraseña
    static isValidPassword(password, minLength = 6) {
        return !!password && password.length >= minLength;
    }
    // Validar que un campo no esté vacío
    static isNotEmpty(value) {
        return value !== null && value !== undefined && value !== '';
    }
    // Validar contraseña fuerte (opcional, más estricto)
    static isStrongPassword(password) {
        // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongRegex.test(password);
    }
}
exports.Validator = Validator;
