export interface NewsLetterResponse {
    message: string,
    id: string
    code: string,
}

export interface NewsLetterProps {
    newsletter: {
        email: string,
        name: string
    }
}