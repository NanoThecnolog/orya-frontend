
export interface CreateUserResponse {
    id: string
    name: string
    trayID: string
    email: string
    status: "ACTIVE" | "INACTIVE"
}
