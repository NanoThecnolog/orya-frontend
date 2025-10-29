import validator from "validator"

export class Validator {
    static email(email: string): boolean {
        if (!email) return false
        //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return validator.isEmail(email)
    }
}