import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
export function ForceLogin({children}:{children:React.ReactNode}){
    let location = useLocation();
    const {user}=useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" state={{ redirectIfAuthenticated: location }} replace />;
    }else{
        return children;
    }

}
