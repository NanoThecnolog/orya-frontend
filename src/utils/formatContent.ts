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
    public discount(price: string | null, percent: number) {
        if (!price) return ""
        const priceNumber = parseFloat(price)
        const discounted = priceNumber - (priceNumber * (percent / 100))
        return `R$ ${this.formatNumber(discounted)} no pix`
    }
}
export const format = new FormatContent()