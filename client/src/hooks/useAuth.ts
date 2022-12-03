import { useState, useEffect } from "react"
import { GetAuthDetails } from "../utils/api"

export function useAuth() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        GetAuthDetails()
            .then(({ data }) => console.log(data))
            .catch((err) => console.log(err))
    }, [])
    return { user }
}