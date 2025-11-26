export interface MenuProps {
    title: string,
    link?: string,
    dropMenu?: DropMenuProps[]
}
export interface DropMenuProps {
    title: string,
    id: string,
    link?: string,
    children?: ChildrenProps[]
}
export interface ChildrenProps {
    title: string,
    id: string,
    link?: string
}