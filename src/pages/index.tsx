import 'tailwindcss/tailwind.css';
import React from "react";
import { Link } from "react-router-dom";
import Button from '@/components/Buttons/PrimaryButton';
import { useAuthContext,Auth} from '@/hooks/useAuth';
export default function Home() {
	const {user} = useAuthContext();

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="ml-4 text-sm text-gray-50 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>

                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center gap-5 pt-8 sm:justify-start sm:pt-0">
                        {user ? <>welcome</> : <><Button className='bg-gray-200 border-2 border-gray-300 hover:bg-gray-300 '><Link
                            to="/login"
                            className="text-sm text-gray-50 no-underline">
                            Login
                        </Link></Button>

                            <Button className='bg-gray-200 border-2 border-gray-300 hover:bg-gray-300 '>
                                <Link
                                    to="/register"
                                    className="text-sm text-gray-50 no-underline">
                                    Register
                                </Link></Button></>}
                    </div>

                </div>
            </div>
        </>
    );
}
