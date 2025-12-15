type PhoneResult = {
    formatted: string
    clean: string
}

class FormatContent {

    private formatNumber(value: number): string {
        return value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
    public price(price: string | null): string {
        if (!price) return ""
        const number = parseFloat(price)
        return `R$ ${this.formatNumber(number)}`
    }
    public discount(price: string | null, percent: number = 5) {
        if (!price) return ""
        const priceNumber = parseFloat(price)
        const discounted = priceNumber - (priceNumber * (5 / 100))
        return `R$ ${this.formatNumber(discounted)} no pix`
    }
    public formatPhoneNumber(ccode: string, areaCode: string, number: string): PhoneResult {
        const cleanCountry = ccode.replace(/[^\d+]/g, '');
        const cleanArea = areaCode.replace(/\D/g, '');
        const cleanNumber = number.replace(/\D/g, '');

        if (!cleanCountry.startsWith('+') || cleanCountry.length < 3) throw new Error('Invalid Country Code')
        if (cleanArea.length < 2) throw new Error('Invalid area code')
        if (cleanNumber.length < 8) throw new Error('Invalid phone nummber')

        const formatted = `${cleanCountry} (${cleanArea}) ${cleanNumber.slice(0, 5)}-${cleanNumber.slice(5)}`
        const clean = `${cleanCountry}${cleanArea}${cleanNumber}`

        return { formatted, clean }
    }


    date(dateInput: string | Date): string {
        const date = new Date(dateInput)

        if (isNaN(date.getTime())) {
            throw new Error("Data inválida")
        }
        return date.toLocaleDateString("pt-BR", {
            timeZone: "UTC"
        }).replace(/\//g, "/")

        /*const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()

        return `${day}/${month}/${year}`*/
    }

}
export const format = new FormatContent()