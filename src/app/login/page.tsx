"use client";
import "./login.css"
import {useState} from "react";
import {useAuth} from "@/context/authContext";
import {Authenticated} from "@/hooks/authenticated";
import {redirect} from "next/navigation";

const Login: React.FC = () => {

    const authenticated = Authenticated()

    if (authenticated){
        redirect('/')
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de autenticação
        // Resetando os campos após o envio do formulário
        login(email, password);
    };

    return (
        <div className="container">
            <div className="card-externo">
                <div className="right">
                    <div className="text-font">
                        <span>Faça Login para continuar</span>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="group-form">
                            <label htmlFor="email" className="text-font">E-mail/CPF</label>
                            <input
                                className="input-form"
                                type="text"
                                id="email"
                                placeholder="Digite seu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label htmlFor="password" className="text-font">Senha</label>
                            <input
                                className="input-form"
                                type="password"
                                id="password"
                                placeholder="Coloque sua Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="group-form">
                            <button className="button text-font">Entrar</button>
                        </div>
                    </form>
                    <div className="link-forgot">
                        <a href="#">Esqueci minha senha</a>
                    </div>
                </div>
                <div className="card-interno">
                    <div className="texto-descricao">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
