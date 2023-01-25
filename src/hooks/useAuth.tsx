import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import type { User } from '@/models/User';


export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();


    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }: any) => { //FIXME
        await csrf();
        setErrors([]);
        axios
            .post('/register', props)
            .then(res => setUser(res.data))
            .catch(error => {
                if (error.response.status === 422){ setErrors("The email is already taken");}
            });
    };

    const login = async ({ setErrors, setStatus, ...props }: any) => { //FIXME
        await csrf();
        console.log("csrf fetched")
        setErrors([]);
        setStatus(null);
        try {
            console.log("login fetch started")
            const res= await axios.post('/login', props);
            console.log("login fetch finished",res)
            setUser(res.data);
            console.log("mutate finished")

            navigate(redirectIfAuthenticated);
            console.log("redirect finished")
        } catch (error) {
            console.error({error});
            // if (error.response.status === 422){setErrors()}
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
        if (user) {
            await axios.post('/logout')
            setUser(undefined);
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
        if (middleware === 'auth' && !user) { logout(); }
    }, [user]);

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
