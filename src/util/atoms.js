import { atom } from "jotai";

export const likesAtom = atom(JSON.parse(sessionStorage.getItem('likes') ?? '[]'));
export const loginModalOpenAtom = atom(false);
export const isLoginAtom = atom(Boolean(sessionStorage.getItem('email')));