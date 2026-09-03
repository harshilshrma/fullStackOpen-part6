import { createContext, useState, useRef } from "react";

const NotificationContext = createContext()
export default NotificationContext

export const NotificationContextProvider = (props) => {
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
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}