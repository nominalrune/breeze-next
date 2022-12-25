import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
    return (
        <div>
            <div className="font-sans text-gray-900 antialiased">
                <Outlet />
            </div>
        </div>
    )
}

export default GuestLayout
