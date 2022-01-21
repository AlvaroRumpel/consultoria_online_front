import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import closeIcon from "../../assets/icons/close.svg";
import Modal from "../Modal";
import {
  ButtonFilledSmall,
  ContainerV,
  Icons,
  InputLarge,
  ListStandart,
  ListStandartItem,
  MainParagraph,
  SectionH,
  SectionV,
  StandardParagraph,
  Title,
} from "../styles";

const InsertExercise = () => {
  const [exercise, setExercise] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [idExercise, setIdExercise] = useState("");
  const modalData = {
    title: "Você tem certeza que deseja excluir",
    content:
      "Tenha certeza que este exercício não está em nenhuma ficha de treino. Após a exclusão do exercício não será mais possivel recupera-lo",
    btnConfirm: {
      text: "Sim!",
      func: () => {
        deleteItem();
        setStatusModal(false);
      },
    },
    btnCancel: {
      text: "Não!",
      func: () => {
        setStatusModal(false);
      },
    },
  };
  useEffect(() => {
    let mounted = true;
    const exerciseData = async () => {
      try {
        await api.get("/exerciseList").then((response) => {
          if (mounted) {
            setExerciseList(response.data);
          }
        });
      } catch (error) {
        toast.error("Erro ao buscar exercícios");
      }
    };
    exerciseData();

    return () => {
      mounted = false;
    };
  }, [exerciseList]);

  const postExercise = async () => {
    try {
      await api
        .post("/exerciseList", { exercise: exercise })
        .then((response) => {
          toast.success("Exercício criado com sucesso!");
        });
    } catch (error) {
      toast.error("Erro ao adicionar exercício");
    }
  };

  const deleteItem = async () => {
    try {
      await api.delete(`/exerciseList/${idExercise}`).then((response) => {
        toast.success("Item deletado com sucesso!");
      });
    } catch (error) {
      toast.error("Falha ao deletar");
    }
  };

  return (
    <ContainerV>
      <SectionV>
        <Title>Insira o nome do exercicio</Title>
        <StandardParagraph>
          Insira um nome que não exista na lista
        </StandardParagraph>
        <SectionH>
          <InputLarge
            value={exercise}
            onChange={(event) => setExercise(event.target.value)}
            type="text"
            placeholder="Insira aqui o nome do exercicio"
          />
          <ButtonFilledSmall onClick={postExercise}>Enviar</ButtonFilledSmall>
        </SectionH>
        <ListStandart>
          {exerciseList ? (
            exerciseList.map((item, index) => (
              <ListStandartItem key={index}>
                <MainParagraph>{item.exercise}</MainParagraph>
                <Icons
                  src={closeIcon}
                  onClick={() => {
                    setIdExercise(item.id);
                    setStatusModal(true);
                  }}
                />
              </ListStandartItem>
            ))
          ) : (
            <ListStandartItem>Nenhum exercício encontrado</ListStandartItem>
          )}
        </ListStandart>
      </SectionV>
      <Modal
        open={statusModal}
        title={modalData.title}
        content={modalData.content}
        btnConfirm={modalData.btnConfirm}
        btnCancel={modalData.btnCancel}
      />
    </ContainerV>
  );
};

export default InsertExercise;
