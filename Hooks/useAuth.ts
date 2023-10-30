
import Router from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("accessToken");

        if (token) {
            setIsAuthenticated(true);
        } else {
            Router.pathname !== "/" && Router.replace(`/`);
        }
    }, []);
    return {
        isAuthenticated,
        setIsAuthenticated
    }
}

export default useAuth
