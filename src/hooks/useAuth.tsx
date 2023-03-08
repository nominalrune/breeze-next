import {axios,csrf} from '@/lib/useAxios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import type { User } from '@/models/User';


export const useAuth = () => {
    const [user, setUser] = useState<User>();
    const navigate=useNavigate();

    interface RegisterInputs {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }
    const register = async (inputs: RegisterInputs, navigateIfAuthenticated: string = "/") => { //FIXME
        await csrf();
        axios
            .post('/register', inputs)
            .then(res => {
                setUser(res.data);
                navigate(navigateIfAuthenticated);
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
    async function prelogin(){
        const res = await axios.get('/login');
            console.log("already logged in", res);
            setUser(res.data.user);
    }
    async function login (inputs: LoginInputs, navigateIfAuthenticated: string = "/"){

        try {
            await prelogin();
            navigate(navigateIfAuthenticated)
        } catch (error) {
            await csrf();
        console.log("csrf fetched");
            console.log("login fetch started");
            try {
                const res = await axios.post('/login', inputs);
                console.log("login fetch finished", res);
                setUser(res.data.user);
                navigate(navigateIfAuthenticated);
            } catch (error) {
                console.error({ error });
                // if (error.response.status === 422){setErrors()}
                // setErrors(error.response.data.errors);
            }
        }};

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
            navigate('/login');
        };

        // useEffect(() => {
        //     if (middleware === 'guest' && navigateIfAuthenticated && user) {
        //         navigate(navigateIfAuthenticated);
        //     }
        //     if (
        //         window.location.pathname === '/verify-email' &&
        //         user?.email_verified_at && navigateIfAuthenticated
        //     ) {
        //         navigate(navigateIfAuthenticated);
        //     }
        //     if (middleware === 'auth' && !user) { logout(); }
        // }, [user]);

        return {
            user,
            register,
            prelogin,
            login,
            forgotPassword,
            resetPassword,
            resendEmailVerification,
            logout,
        };
    };
