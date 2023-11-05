
import api from '@/helpers/api';
import axios from 'axios';
import Router from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("accessToken");

        const validateUser = async () => {
            if (token) {
                // setIsAuthenticated(true);
                try {
                    await api.get('http://localhost:8000/api/auth/validate', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setIsAuthenticated(true)
                } catch (err: any) {
                    console.log(err.response)
                    setIsAuthenticated(false)
                    Router.pathname !== "/" && Router.replace(`/`);
                }
            } else {
                setIsAuthenticated(false)
                Router.pathname !== "/" && Router.replace(`/`);
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
