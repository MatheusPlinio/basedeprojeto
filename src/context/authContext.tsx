"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

// Tipagem do User
type User = {
    name: string;
    email: string;
    access_token: string;
};

// Tipagem do AuthContext
type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    signUp: (name: string, email: string, password: string) => void;
};

// Constanter para o AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider para envolver a autenticação no projeto e nos childrens do mesmo.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const host = process.env.NEXT_PUBLIC_API_URL;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    // Modulo de Login
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/authenticated', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const user: User = await response.json();
                localStorage.setItem("user", JSON.stringify(user.access_token));
                setUser(user);
                window.location.replace("http://localhost:3000");
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    // Modulo de Cadastro de usuário
    const signUp = async (name: string, email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });

            if (response.ok) {
                const newUser: User = await response.json();
                setUser(newUser);
                window.location.replace("http://localhost:3000");
            } else {
                throw new Error("Registro error");
            }
        } catch (error) {
            console.error("Error during register", error);
        }
    };
    // modulo de disconnect
    const logout = async () => {
        const token = localStorage.getItem("user");
        let accessToken = null;
        if (token !== null) {
            const user = JSON.parse(token);
            accessToken = user.access_token;
        }

        try {
            const response = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem("user");
                setUser(null);
            } else {
                throw new Error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout", error);
        }
    };

    return (
        <AuthContext.Provider value={{user, login, logout, signUp}}>
            {children}
        </AuthContext.Provider>
    );
};

// execução do AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};