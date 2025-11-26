export interface NewsLetterResponse {
    message: string,
    id: string
    code: string,
}

export interface NewsLetterProps {
    NewsLetter: {
        email: string,
        name: string
    }
}