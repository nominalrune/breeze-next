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

export default function App() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route element={<AppLayout user={user} header={<>ATEST</>}/>}>
                <Route path="/"  element={<Home user={user} />} />
                <Route path="dashboard" element={<Dashboard user={user} />} />
                <Route path="task" element={<Dashboard user={user} />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword  />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
