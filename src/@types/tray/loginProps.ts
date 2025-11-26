export interface CreateLoginProps {
    name: string,
    email: string,
    trayID: string,
    password: string,
    status?: "ACTIVE" | "INACTIVE"
}

export interface UserLoginProps {
    id: string
    name: string
    email: string
    trayID: string
    status: "ACTIVE" | "INACTIVE"

}

export interface LoginResponseInterface {
    user: UserLoginProps
    token: string
}