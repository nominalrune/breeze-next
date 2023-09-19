import NestedForm, { type OnClick, DataObj } from '@/components/Inputs/NestedForm';
import useAuth from '@/hooks/useAuth';
export const LoginForm = ({ redirectIfAuthenticated }: { redirectIfAuthenticated?: string; }) => {
	const auth = useAuth();
	const prop = [
		{
			name: "email",
			type: "email",
			label: "Email",
		},
		{
			name: "password",
			type: "password",
			label: "Password",
		},
		{
			name: "remember",
			type: "checkbox",
			label: "Remember Me",
		},
	] as const;

	const submit: OnClick<typeof prop> = (data) => {
		console.log({ auth });
		return auth.login({ email: data.email, password: data.password, remember: data.remember });
	};

	return (
		<div className='bg-white rounded-md p-6 px-9'>
			<NestedForm
				properties={prop}
				primaryAction={{ label: "Login", onClick: submit, }}

			/></div>
	);
};
