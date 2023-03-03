import Navigation from '@/components/Layouts/Navigation';

import { Outlet } from "react-router-dom";
import { ErrorBoundary } from './ErrorBoundary';
import { useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';


const AppLayout = () => {
    const { user } = useAuth();
    return user
        ? (
                <div className="min-h-screen bg-gray-100">
                    <Navigation user={user} />
                    <main>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </main>
                </div>
        )
        : <div>
            <div className="font-sans text-gray-900 antialiased">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>;
};

export default AppLayout;
