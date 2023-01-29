import React, {createContext} from "react";
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
import { AuthContext } from '@/contexts/AuthContext';
import { Index } from '@/pages/task/Index';

export default function App() {

    return (
            <Routes>
                <Route path="/" element={<AppLayout header={<>ATEST</>}/>}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="task" element={<Dashboard />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify-email" element={<VerifyEmail />} />
                    <Route path="forgot-password" element={<ForgotPassword  />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
    );
};
