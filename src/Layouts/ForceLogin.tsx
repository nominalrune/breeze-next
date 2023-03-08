import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
export function ForceLogin({children,route}:{children:React.ReactNode,route:string}){
    let location = useLocation();
    const {user}=useContext(AuthContext);
    console.log("ForceLogin",user);
    if (!user) {
      return <><Navigate to={`/login?redirect=${route}`} state={{ redirectIfAuthenticated: location }} replace /></>;
    }else{
        return children;
    }

}
