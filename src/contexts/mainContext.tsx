import { createContext, ReactNode, useContext, useState } from "react";

interface MainProviderProps {
    children: ReactNode;
}
interface MainContextProps {
    cartOpen: boolean,
    setCartOpen: (value: boolean) => void
}

export const mainContext = createContext<MainContextProps>({
    cartOpen: false,
    setCartOpen: (/*data: boolean */) => { }
})

export function MainProvider({ children }: MainProviderProps) {
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    return (
        <mainContext.Provider value={{ cartOpen, setCartOpen }}>
            {children}
        </mainContext.Provider>
    )
}

export const useMain = () => {
    return useContext(mainContext)
}