import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Buttons/PrimaryButton'
import Input from '@/components/Input'
import InputError from '@/components/Inputs/InputError'
import Label from '@/components/Label'
import {Link, useNavigate} from 'react-router-dom'
import { useState,ChangeEvent } from 'react'
// import { AuthService, AuthContext } from '@/services/AuthService';
import useAuth from '@/hooks/useAuth';

const ForgotPassword = () => {
    const {forgotPassword} = useAuth()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<any>([]) //FIXME - any
    const [status, setStatus] = useState(null)

    const submitForm = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        forgotPassword(email)
    }

    return (
            <AuthCard
                logo={
                    <Link to="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button>Email Password Reset Link</Button>
                    </div>
                </form>
            </AuthCard>
    )
}

export default ForgotPassword
