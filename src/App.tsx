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
// import { AuthService, AuthContext, UserContext } from '@/services/AuthService';
import { ForceLogin } from './Layouts/ForceLogin';
import { Index as Tasks } from '@/pages/task/Index';
import { Create as TaskCreate } from '@/pages/task/Create';
import { Show as TaskShow } from '@/pages/task/Show';
import { Index as Calendar } from '@/pages/calendar/Index';
import { Create as CalendarCreate } from '@/pages/calendar/Create';
import { Show as CalendarShow } from '@/pages/calendar/Show';
import { Index as Record } from '@/pages/record/Index';
import { Create as RecordCreate } from '@/pages/record/Create';
import { Show as RecordShow } from '@/pages/record/Show';
import { useAuth, Auth, AuthContext } from '@/hooks/useAuth';

export default function App() {
	const auth = useAuth();
	return (
		<AuthContext.Provider value={auth}>
			{/* // 	<UserContext.Provider value={auth.user}> */}
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Home />} />
					<Route path="dashboard" element={<ForceLogin><Dashboard /></ForceLogin>} />
					{/* <Route path="/tasks"  element={<Tasks />} />
                <Route path="/tasks/create" element={<TaskCreate />} />
                 */}
					<Route path="tasks">
						<Route index element={<ForceLogin><Tasks /></ForceLogin>} />
						<Route path="create" element={<ForceLogin><TaskCreate /></ForceLogin>} />
						<Route path=":taskId" element={<ForceLogin><TaskShow /></ForceLogin>} />
					</Route>
					<Route path="calendar">
						<Route index element={<ForceLogin><Calendar /></ForceLogin>} />
						<Route path="create" element={<ForceLogin><CalendarCreate /></ForceLogin>} />
						<Route path=":calendarId" element={<ForceLogin><CalendarShow /></ForceLogin>} />
					</Route>
					<Route path="records">
						<Route index element={<ForceLogin><Record /></ForceLogin>} />
						<Route path="create" element={<ForceLogin><RecordCreate /></ForceLogin>} />
						<Route path=":recordId" element={<ForceLogin><RecordShow /></ForceLogin>} />
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
			{/* // 	</UserContext.Provider> */}
		</AuthContext.Provider>
	);
};
