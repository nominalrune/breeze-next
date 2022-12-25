import useSWR from 'swr';
import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import { redirect, useParams, useNavigate } from "react-router-dom";
import {User} from '@/models/User';


type Params = { middleware?: string, redirectIfAuthenticated?: string; };
export const useAuth = ({ middleware, redirectIfAuthenticated = "/" }: Params = {}) => {
    const navigate = useNavigate();
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status === 409) { navigate('/verify-email'); }
                throw new Error(error);
            }), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }: any) => { //FIXME
        await csrf();

        setErrors([]);

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw new Error(error);

                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, setStatus, ...props }: any) => { //FIXME
        await csrf();
        setErrors([]);
        setStatus(null);
        try {
            await axios.post('/login', props);
            console.log("login fetch finished")
            await mutate();
            console.log("mutate finished")

            // navigate(redirectIfAuthenticated);
            navigate("/dashboard");
            console.log("redirect finished")
        } catch (error) {
            // if (error.response.status === 422){setErrors(error.response.data.errors)}
            throw error;
            // setErrors(error.response.data.errors);
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: any) => { //FIXME
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw new Error(error);

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }: any) => { //FIXME
        const { token } = useParams();
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/reset-password', { token, ...props })
            .then(response =>
                navigate('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw new Error(error);

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }: any) => { //FIXME
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status));


    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout')
            await mutate();
        }
        navigate('/');
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            navigate(redirectIfAuthenticated);
        }
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at && redirectIfAuthenticated
        ) {
            navigate(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) { logout(); }
    }, [user, error]);

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
