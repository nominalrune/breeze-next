import Navigation from '@/components/Layouts/Navigation';

import { Outlet } from "react-router-dom";
import type { User } from '@/models/User';
import { ErrorBoundary } from './ErrorBoundary';
type Params = {
    header: React.ReactNode,
    user: User | undefined;
};
const AppLayout = ({ user }: Params) => {

    return user
        ? <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary></main>
        </div>
        : <div>
            <div className="font-sans text-gray-900 antialiased">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>;
};

export default AppLayout;
