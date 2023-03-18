import Navigation from '@/Layouts/Navigation';

import { Outlet } from "react-router-dom";
import { ErrorBoundary } from './ErrorBoundary';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { AuthParam } from '@/models/User';
const AppLayout = ({user}:AuthParam) => {
    return user
        ? <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />
            <main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </div>
        : <div><span className='fixed right-0 bottom-0'>not logged in</span>
            <div className="font-sans text-gray-900 antialiased">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>;
};

export default AppLayout;
