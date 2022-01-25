import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import Modal from "../Modal";
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

const Singup = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  let navigate = useNavigate();

  const modalData = {
    title: "Confirmação de email enviada",
    content: "Cheque seu email para confirmar que seu email é existente",
    btnConfirm: {
      text: "Certo!",
      func: () => {
        setStatusModal(false);
        navigate("/login");
      },
    },
  };

  const singup = async () => {
    try {
      await api
        .post("/clients", {
          name: name,
          user: user,
          email: email,
          password: password,
        })
        .then((response) => {
          setStatusModal(true);
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
        <Title>Cadastro</Title>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            singup();
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
          <Label htmlFor="name">Nome</Label>
          <InputStandard
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            id="name"
            type="text"
            placeholder="Insira seu nome"
          />
          <Label htmlFor="email">Email</Label>
          <InputStandard
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            id="email"
            type="email"
            placeholder="Insira seu email"
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
          <ButtonFilled type="submit">Cadastrar</ButtonFilled>
          <Link to="/">
            <ButtonOutlined>Sair</ButtonOutlined>
          </Link>
        </Form>
      </SectionV>
      <Modal
        open={statusModal}
        title={modalData.title}
        content={modalData.content}
        btnConfirm={modalData.btnConfirm}
      />
    </ContainerV>
  );
};

export default Singup;
