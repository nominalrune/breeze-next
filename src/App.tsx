import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from './pages/index';
import AppLayout from '@/Layouts/AppLayout';
import NotFoundPage from '@/pages/404';
import Login from '@/pages/login';
import Register from '@/pages/register';
import VerifyEmail from '@/pages/verify-email';
import ForgotPassword from '@/pages/forgot-password';
import  Tasks from '@/pages/task/Index';
import TaskCreate from '@/pages/task/Create';
import TaskShow from '@/pages/task/Show';
import  Calendar from '@/pages/calendar/Index';
import CalendarCreate from '@/pages/calendar/Create';
import CalendarShow from '@/pages/calendar/Show';
import  Record from '@/pages/record/Index';
import RecordCreate from '@/pages/record/Create';
import RecordShow from '@/pages/record/Show';
import useUser from '@/hooks/useUser';
// import { lazy } from 'react';

// const Dashboard = lazy(() => import('./pages/dashboard'));
// const Home = lazy(() => import('./pages/index'));
// const AppLayout = lazy(() => import('@/Layouts/AppLayout'));
// const NotFoundPage = lazy(() => import('@/pages/404'));
// const Login = lazy(() => import('@/pages/login'));
// const Register = lazy(() => import('@/pages/register'));
// const VerifyEmail = lazy(() => import('@/pages/verify-email'));
// const ForgotPassword = lazy(() => import('@/pages/forgot-password'));
// const Tasks = lazy(() => import('@/pages/task/Index'));
// const TaskCreate = lazy(() => import('@/pages/task/Create'));
// const TaskShow = lazy(() => import('@/pages/task/Show'));
// const Calendar = lazy(() => import('@/pages/calendar/Index'));
// const CalendarCreate = lazy(() => import('@/pages/calendar/Create'));
// const CalendarShow = lazy(() => import('@/pages/calendar/Show'));
// const Record = lazy(() => import('@/pages/record/Index'));
// const RecordCreate = lazy(() => import('@/pages/record/Create'));
// const RecordShow = lazy(() => import('@/pages/record/Show'));

export default function App() {
	const user = useUser(state=>state.user);
	return (
			<Routes>
				<Route path="/" element={<AppLayout user={user}/>}>
					<Route index element={<Home />} />
					<Route path="dashboard" element={<Dashboard />} />
					{/* <Route path="/tasks"  element={<Tasks />} />
                <Route path="/tasks/create" element={<TaskCreate />} />
                 */}
					<Route path="tasks">
						<Route index element={<Tasks />} />
						<Route path="create" element={<TaskCreate />} />
						<Route path=":taskId" element={<TaskShow user={user} />} />
					</Route>
					<Route path="calendar">
						<Route index element={<Calendar user={user} />} />
						<Route path="create" element={<CalendarCreate />} />
						<Route path=":calendarId" element={<CalendarShow />} />
					</Route>
					<Route path="records">
						<Route index element={<Record />} />
						<Route path="create" element={<RecordCreate />} />
						<Route path=":recordId" element={<RecordShow />} />
					</Route>
					{/* </Route> */}
					{/* <Route path="dashboard" element={<Dashboard />} />
                    <Route path="task" element={<Tasks />} /> */}
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="verify-email" element={<VerifyEmail />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
	);
};
