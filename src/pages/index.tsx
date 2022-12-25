import 'tailwindcss/tailwind.css'
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import type{ User } from '@/hooks/auth'

export default function Home({user}:{user:User}) {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="ml-4 text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>

                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
                        <Link
                                to="/login"
                                className="text-sm text-gray-700 underline">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
