import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from './pages/index';
import AppLayout from '@/Layouts/AppLayout';
import NotFoundPage from '@/pages/404';
import Login from '@/pages/login';
import Register from '@/pages/register';
import VerifyEmail from '@/pages/verify-email';
import ForgotPassword from '@/pages/forgot-password';
import { AuthContext } from '@/contexts/AuthContext';
import { ForceLogin } from './Layouts/ForceLogin';
import { Index as Tasks } from '@/pages/task/Index';
import { Create as TaskCreate } from '@/pages/task/Create';
import { Show as TaskShow } from '@/pages/task/Show';

export default function App() {
    const { user } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<AppLayout user={user} />}>
                <Route index element={<Home user={user} />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="/tasks"  element={<Tasks />} />
                <Route path="/tasks/create" element={<TaskCreate user={user} />} />
                 */}
                <Route path="tasks">
                    <Route index element={<Tasks />} />
                    <Route path="create" element={<TaskCreate user={user} />} />
                    <Route path=":taskId" element={<TaskShow user={user} />} />
                </Route>
                {/* </Route> */}
                {/* <Route path="dashboard" element={<ForceLogin><Dashboard /></ForceLogin>} />
                    <Route path="task" element={<ForceLogin><Tasks /></ForceLogin>} /> */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
