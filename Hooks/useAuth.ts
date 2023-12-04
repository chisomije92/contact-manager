
import api, { baseURL } from '@/helpers/api';
import Router from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("accessToken");

        const validateUser = async () => {
            if (token) {
                try {
                    await api.get(`${baseURL}/auth/validate`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setIsAuthenticated(true)
                } catch (err: any) {
                    console.log(err.response)
                    setIsAuthenticated(false)
                    Router.pathname !== "/" && Router.replace(`/login`);
                }
            } else {
                setIsAuthenticated(false)
                Router.pathname !== "/" && Router.replace(`/login`);
            }
        }
        validateUser()

    }, []);
    return {
        isAuthenticated,
        setIsAuthenticated
    }
}

export default useAuth
