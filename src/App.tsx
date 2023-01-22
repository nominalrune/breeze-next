import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from './pages/index';
import AppLayout from '@/components/Layouts/AppLayout';
import GuestLayout from './components/Layouts/GuestLayout';
import NotFoundPage from '@/pages/404';
import Login from '@/pages/login';
import Register from '@/pages/register';
import VerifyEmail from '@/pages/verify-email';
import ForgotPassword from '@/pages/forgot-password';
import { useAuth } from '@/hooks/auth';
import { Index } from '@/pages/task/Index';

export default function App() {
    const { user,login } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<AppLayout user={user} header={<>ATEST</>}/>}>
                <Route index element={<Home user={user} />} />
                <Route path="dashboard" element={<Dashboard user={user} />} />
                <Route path="task" element={<Dashboard user={user} />} />
                <Route path="login" element={<Login login={login}/>} />
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword  />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
