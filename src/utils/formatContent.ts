class FormatContent {
    public price(price: number): string {
        return `R$ ${price.toFixed(2)}`
    }
    public discount(price: number, percent: number) {
        const discounted = price - (price * (percent / 100))
        return `R$ ${discounted.toFixed(2)}`
    }
}
export const format = new FormatContent()