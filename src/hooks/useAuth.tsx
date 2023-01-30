import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import type { User } from '@/models/User';


export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();


    const csrf = () => axios.get('/sanctum/csrf-cookie');

    interface RegisterInputs {
        name: string;
        email: string;
        password: string;
    }
    const register = async (inputs: RegisterInputs, redirectIfAuthenticated: string = "/") => { //FIXME
        await csrf();
        axios
            .post('/register', inputs)
            .then(res => {
                setUser(res.data);
                navigate(redirectIfAuthenticated);
            })
            .catch(error => {
                // if (error.response.status === 422){ return {error:"The email is already taken"};}
                return { error };
            });
    };
    interface LoginInputs {
        email: string;
        password: string;
        remember: boolean;
    }
    const login = async (inputs: LoginInputs, redirectIfAuthenticated: string = "/") => {
        await csrf();
        console.log("csrf fetched");
        try {
            console.log("login fetch started");
            const res = await axios.post('/login', inputs);
            console.log("login fetch finished", res);
            setUser(res.data);
            navigate(redirectIfAuthenticated);
        } catch (error) {
            console.error({ error });
            // if (error.response.status === 422){setErrors()}
            // setErrors(error.response.data.errors);
        }
    };

    const forgotPassword = async (email: string) => { //FIXME
        await csrf();

        axios
            .post('/forgot-password', { email })
            .catch(error => {
                // if (error.response.status !== 422) throw new Error(error);
                throw new Error(error);
            });
    };

    const resetPassword = async (props: any) => { //FIXME
        const { token } = useParams();
        await csrf();
        axios
            .post('/reset-password', { token, ...props })
            .then(response =>
                navigate('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw new Error(error);
            });
    };

    const resendEmailVerification = () => {
        axios
            .post('/email/verification-notification');
    };

    const logout = async () => {
        if (user) {
            await axios.post('/logout');
            setUser(undefined);
        }
        navigate('/');
    };

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user) {
    //         navigate(redirectIfAuthenticated);
    //     }
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at && redirectIfAuthenticated
    //     ) {
    //         navigate(redirectIfAuthenticated);
    //     }
    //     if (middleware === 'auth' && !user) { logout(); }
    // }, [user]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
};
