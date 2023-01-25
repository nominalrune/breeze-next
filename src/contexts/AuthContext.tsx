import { createContext } from 'react';
import type { User } from '@/models/User';
import {useAuth} from '@/hooks/useAuth';


export const AuthContext = createContext(useAuth());
