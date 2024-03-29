import AppLayout from '@/Layouts/AppLayout'
import type{ UserDTO } from '@/models/User'
const Dashboard = ({user}:{user?:UserDTO}) => {
    return (

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Dashboard
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard
