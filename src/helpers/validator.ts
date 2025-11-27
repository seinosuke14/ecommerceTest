export class Validator {

    // Validar formato de email
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar longitud de contraseña
    static isValidPassword(password: string, minLength: number = 6): boolean {
        return !!password && password.length >= minLength;
    }

    // Validar que un campo no esté vacío
    static isNotEmpty(value: any): boolean {
        return value !== null && value !== undefined && value !== '';
    }

    // Validar contraseña fuerte (opcional, más estricto)
    static isStrongPassword(password: string): boolean {
        // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongRegex.test(password);
    }
}