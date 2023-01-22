import type{User} from '@/models/User';
import type { RecordWithTtl } from 'dns';
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
export function ForceLogin({user,children}:{user?:User,children:React.ReactNode}){
    let location = useLocation();
    if (!user) {
      return <Navigate to="/login" state={{ redirectIfAuthenticated: location }} replace />;
    }else{
        return children;
    }

}
