import { atom, selector } from "recoil";
import type { User } from '@/models/User';

export const userState = atom<User>({
  key: "userState",
  default: undefined
});
