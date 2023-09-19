import { UserDTOSchema, type UserDTO } from '@/models/User/User';
import { create } from 'zustand';

interface AuthState {
	user: UserDTO | undefined;
	setUser: (user: UserDTO | undefined) => void;
}
const useUser = create<AuthState>((set) => ({
	user: undefined,
	setUser: (user: UserDTO | undefined) => set({ user: user ? UserDTOSchema.parse(user) : undefined }),
}));

export default useUser;
