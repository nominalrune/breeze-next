import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Buttons/PrimaryButton'
import Input from '@/components/Input'
import InputError from '@/components/Inputs/InputError'
import Label from '@/components/Label'
import { Link } from "react-router-dom";
// import { AuthService, AuthContext } from '@/services/AuthService';
import React, { ChangeEvent, useState } from 'react'
import {useAuthContext} from '@/hooks/useAuth';
const Register = () => {
    const { register } = useAuthContext();


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<any>([])
	const [passphrase, setPassphrase] = useState('')

    const submitForm = (event:React.FormEvent)  => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
			passphrase
        },
        '/dashboard',)
    }

    return (
            <AuthCard
                logo={
                    <Link to="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors?.name} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            required
                        />

                        <InputError messages={errors?.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />

                        <InputError
                            messages={errors?.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        <InputError
                            messages={errors?.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="passphrase"
                            type="password"
                            value={passphrase}
                            className="block mt-1 w-full"
                            onChange={(event:ChangeEvent<HTMLInputElement>) =>
                                setPassphrase(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            to="/login"
                            className="underline text-sm text-gray-600 hover:text-gray-900">
                            Already registered?
                        </Link>

                        <Button className="ml-4">Register</Button>
                    </div>
                </form>
            </AuthCard>
    )
}

export default Register
