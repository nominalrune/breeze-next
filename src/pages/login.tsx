import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import Button from '@/components/Buttons/PrimaryButton';
import Input from '@/components/Input';
import InputError from '@/components/Inputs/InputError';
import Label from '@/components/Label';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext} from '@/hooks/useAuth';
const Login = ({ redirectIfAuthenticated }: { redirectIfAuthenticated?: string; }) => {
	const { login, user } = useAuthContext();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [shouldRemember, setShouldRemember] = useState(false);
	const [errors, setErrors] = useState({ email: [""], password: [""], });
	const [status, setStatus] = useState<string | null>(null);
	const { reset, redirect } = useParams();

	useEffect(() => {
		if (typeof reset === 'string' && reset.length > 0) {
			setStatus(atob(reset));
		} else {
			setStatus(null);
		}
	});

	const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			email,
			password,
			remember: shouldRemember,
		};
		console.log({ formData });
		await login(formData, redirectIfAuthenticated);
	};

	return (
		<AuthCard
			logo={
				<Link to="/">
					<ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
				</Link>
			}>
			{/* Session Status */}
			<AuthSessionStatus className="mb-4" status={status} />

			<form onSubmit={submitForm}>
				{/* Email Address */}
				<div>
					<Label htmlFor="email">Email</Label>

					<Input
						id="email"
						type="email"
						value={email}
						className="block mt-1 w-full"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
						required
						autoFocus
					/>
				</div>

				{/* Password */}
				<div className="mt-4">
					<Label htmlFor="password">Password</Label>

					<Input
						id="password"
						type="password"
						value={password}
						className="block mt-1 w-full"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
						required
						autoComplete="current-password"
					/>
				</div>

				{/* Remember Me */}
				<div className="block mt-4">
					<label
						htmlFor="remember_me"
						className="inline-flex items-center">
						<input
							id="remember_me"
							type="checkbox"
							name="remember"
							className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							onChange={event =>
								setShouldRemember(event.target.checked)
							}
						/>

						<span className="ml-2 text-sm text-gray-600">
							Remember me
						</span>
					</label>
				</div>

				<div className="flex items-center justify-end mt-4">
					<Link
						to="/forgot-password"
						className="underline text-sm text-gray-600 hover:text-gray-900">
						Forgot your password?
					</Link>

					<Button type="submit" className="ml-3">Login</Button>
				</div>
			</form>
		</AuthCard>
	);
};

export default Login;
