import {useAuth} from "@/context/authContext";

export const Authenticated = (): boolean => {
    const { user } = useAuth();

    const isAuth = !!user;

    return isAuth;
};
//Hook de autenticação para renderização condicional