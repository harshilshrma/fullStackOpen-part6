import { createContext, useState, useRef } from "react";

const AnecdoteContext = createContext()
export default AnecdoteContext

export const AnecdoteContextProvider = (props) => {
    const [notification, setNotification] = useState('')
    const notificationTimeout = useRef(null)

    const showNotification = (notif) => {
        setNotification(notif)
        
        if (notificationTimeout.current) {
            clearTimeout(notificationTimeout.current)
        }

        notificationTimeout.current = setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    return (
        <AnecdoteContext.Provider value={{ notification, showNotification }}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}