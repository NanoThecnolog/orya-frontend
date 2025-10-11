class FormatContent {
    public price(price: string | null): string {
        if (!price) return ""
        const number = parseFloat(price).toFixed(2)
        return `R$ ${number}`
    }
    public discount(price: string | null, percent: number) {
        if (!price) return ""
        const priceNumber = parseFloat(price)
        const discounted = priceNumber - (priceNumber * (percent / 100))
        return `R$ ${discounted.toFixed(2)} no pix`
    }
}
export const format = new FormatContent()