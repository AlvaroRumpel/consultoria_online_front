import React, { useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  ButtonFilled,
  ButtonOutlined,
  ContainerV,
  Form,
  InputStandard,
  Label,
  SectionV,
  Title,
} from "../styles";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const login = async () => {
    try {
      await api
        .post("/clients/login", { user: user, password: password })
        .then((response) => {
          localStorage.setItem("token", response.headers.authorization);
          sessionStorage.setItem("refresh", response.data.refreshToken);
          navigate("/");
        });
    } catch (error) {
      if (error.response.data === "Usuario ou senha incorretos") {
        return toast.warn(error.response.data);
      } else if (error.response.status === 401) {
        return toast.error("Preencha os campos");
      }
      return toast.error("Erro desconhecido");
    }
  };

  return (
    <ContainerV>
      <SectionV>
        <Title>Login</Title>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            login();
          }}
        >
          <Label htmlFor="user">Usuário</Label>
          <InputStandard
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
            }}
            id="user"
            type="text"
            placeholder="Insira sua usuário"
          />
          <Label htmlFor="password">Senha</Label>
          <InputStandard
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            id="password"
            type="password"
            placeholder="Insira sua senha"
          />
          <ButtonFilled type="submit">Entrar</ButtonFilled>
          <Link to="/singup">
            <ButtonOutlined>Cadastre-se</ButtonOutlined>
          </Link>
        </Form>
      </SectionV>
    </ContainerV>
  );
};

export default Login;
