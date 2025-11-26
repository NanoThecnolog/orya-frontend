import validator from "validator"

export class Validator {
    static email(email: string): boolean {
        if (!email) return false
        validator.isEmail(email)
        const [local, domain] = email.split("@")

        const blockedDomains = [
            "email.com",
            "teste.com",
            "test.com",
            "example.com",
            "domain.com"
        ]

        if (blockedDomains.includes(domain)) return false

        const domainName = domain.split(".")[0]
        if (local.toLowerCase() === domainName.toLowerCase()) return false

        if (domain.split(".").length < 2) return false
        return true

    }
    static validatePassword(password: string): { valid: boolean; message?: string } {
        const minLength = /.{8,}/;
        const upper = /[A-Z]/;
        const lower = /[a-z]/;
        const number = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>_\-]/;

        if (!minLength.test(password)) {
            return { valid: false, message: "A senha deve ter no mínimo 8 caracteres." };
        }
        if (!upper.test(password)) {
            return { valid: false, message: "A senha deve conter ao menos uma letra maiúscula." };
        }
        if (!lower.test(password)) {
            return { valid: false, message: "A senha deve conter ao menos uma letra minúscula." };
        }
        if (!number.test(password)) {
            return { valid: false, message: "A senha deve conter ao menos um número." };
        }
        if (!special.test(password)) {
            return { valid: false, message: "A senha deve conter ao menos um caractere especial." };
        }

        return { valid: true };
    }

}