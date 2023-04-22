import NestedForm,{type OnClick,DataModel} from '@/components/Inputs/NestedForm';
import { useAuthContext} from '@/hooks/useAuth';
export const LoginForm = ({ redirectIfAuthenticated }: { redirectIfAuthenticated?: string; }) => {
	const auth = useAuthContext();
	const prop=[
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

	const submit:OnClick<DataModel<typeof prop,3>> =(data, functions)=> {
		console.log({auth})
		auth.login({email:data.email, password:data.password, remember:data.remember});
	};

	return (
		<div className='bg-white rounded-md p-6 px-9'>
		<NestedForm
		properties={prop}
		primaryAction={{label:"Login",onClick:submit,}}
		unit={3}
		/></div>
	);
};
