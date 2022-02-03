import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/api";
import moreIcon from "../../../assets/icons/more.svg";
import lessIcon from "../../../assets/icons/less.svg";
import {
  ButtonAccept,
  ButtonCancel,
  ButtonFilled,
  ContainerV,
  SectionV,
  Title,
} from "../../styles";
import {
  FormSheet,
  IconsSheet,
  InputSheet,
  Option,
  Selector,
  SelectorSheet,
  Sheet,
  SheetLabel,
  SheetLabelGroup,
  SheetSection,
} from "../style";
import Loader from "../../Loader";

const Create = () => {
  const [day, setDay] = useState("1");
  const [exerciseList, setExerciseList] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loader, setLoader] = useState("");

  const [numberOfExercises, setNumberOfExercises] = useState([]);

  const days = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
    "Domingo",
  ];
  const exerciseData = async () => {
    try {
      setLoader(true);
      await api.get("/exerciseList").then((response) => {
        setExerciseList(response.data);
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
      toast.error("Erro ao buscar exercícios");
    }
  };

  const exerciseStack = {
    series: "",
    repetitions: "",
    load: "",
    method: "",
    interval: "",
    id_exercise: "",
  };

  const changingValues = (event, i, target) => {
    const value = event.target.value;
    let exercise = exercises;
    exercise[i][target] = value;
    setExercises(exercise);
  };

  const twoInTwo = () => {
    let results = [];
    for (let i = 0; i <= 1000; i = i + 2) {
      results.push(i);
    }
    return results;
  };

  const tenInTen = () => {
    let results = [];
    for (let i = 0; i <= 1000; i = i + 10) {
      results.push(i);
    }
    return results;
  };

  const selectorOption = (value, modified) => {
    if (modified) {
      const predefined = {
        twoInTwo: twoInTwo(),
        tenInTen: tenInTen(),
      };
      return predefined[modified].map((item, i) => (
        <Option key={i} value={item}>
          {item}
        </Option>
      ));
    }
    let options = [];
    for (let i = 0; i < value; i++) {
      options.push(i + 1);
    }
    return options.map((item, i) => (
      <Option key={i} value={item}>
        {item}
      </Option>
    ));
  };

  const postExercise = async () => {
    let exercisesList = {
      week_day: JSON.parse(day),
    };
    exercises.map(async (item, i) => {
      setLoader(true);
      try {
        await api
          .post(`/exercise`, {
            series: item.series,
            repetitions: item.repetitions,
            load: item.load,
            method: item.method,
            interval: item.interval,
            id_exercise: item.id_exercise,
          })
          .then(async (response) => {
            exercisesList[`id_exercise_0${i + 1}`] = await response.data.id;
          });
      } catch (error) {
        setLoader(false);
        toast.error("Erro ao salvar algum exercício");
      }
    });
    console.log(exercisesList);
    await postWeekDay(exercisesList);
  };

  const postWeekDay = async (exercisesList) => {
    try {
      console.log(exercisesList);
      await api.post(`/weekDay`, exercisesList).then(async (response) => {
        console.log(response);
        // if (await !sessionStorage.getItem("training_sheet")) {
        //   await sessionStorage.setItem("training_sheet", response.data.id);
        // } else {
        //   const trainingSheet = await sessionStorage.getItem("training_sheet");
        //   await sessionStorage.setItem("training_sheet", { ...trainingSheet });
        // }
        setLoader(false);
      });
    } catch (error) {
      console.log(error.message);
      setLoader(false);
      toast.error("Erro ao salvar o dia da semana");
    }
  };

  return (
    <ContainerV>
      <Loader active={loader} />
      <SectionV>
        <Title>Criar ficha de treino</Title>
        <Sheet>
          <FormSheet
            action="submit"
            onSubmit={(event) => {
              event.preventDefault();
              postExercise();
            }}
          >
            <Selector
              onChange={(event) => {
                const selected = event.target.selectedOptions[0].value;
                setDay(selected);
              }}
            >
              {days.map((item, index) => (
                <Option key={index} value={index + 1}>
                  {item}
                </Option>
              ))}
            </Selector>

            {numberOfExercises.map((value, i) => {
              return (
                <SheetSection key={value}>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="exercise">Exercício</SheetLabel>
                    <Selector
                      id="exercise"
                      onChange={(event) =>
                        changingValues(event, i, "id_exercise")
                      }
                    >
                      {exerciseList.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.exercise}
                        </Option>
                      ))}
                    </Selector>
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="series">Séries</SheetLabel>
                    <SelectorSheet
                      required
                      onChange={(event) => {
                        changingValues(event, i, "series");
                      }}
                      id="series"
                    >
                      {selectorOption(20, false)}
                    </SelectorSheet>
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="repetitions">Repetições</SheetLabel>
                    <SelectorSheet
                      onChange={(event) =>
                        changingValues(event, i, "repetitions")
                      }
                      required
                      id="repetitions"
                    >
                      {selectorOption(100, false)}
                    </SelectorSheet>
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="load">Carga (Kg)</SheetLabel>
                    <SelectorSheet
                      onChange={(event) => changingValues(event, i, "load")}
                      required
                      id="load"
                    >
                      {selectorOption(0, "twoInTwo")}
                    </SelectorSheet>
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="interval">Intervalo (s)</SheetLabel>
                    <SelectorSheet
                      onChange={(event) => changingValues(event, i, "interval")}
                      required
                      id="interval"
                    >
                      {selectorOption(0, "tenInTen")}
                    </SelectorSheet>
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <SheetLabel htmlFor="method">Método</SheetLabel>
                    <InputSheet
                      onChange={(event) => changingValues(event, i, "method")}
                      required
                      id="method"
                      type="text"
                      placeholder="Método"
                    />
                  </SheetLabelGroup>
                  <SheetLabelGroup>
                    <ButtonAccept>Salvar</ButtonAccept>
                    <ButtonCancel
                    type="button"
                      onClick={() => {
                        let exercise = exercises.filter((item, index) => index !== i);
                        setExercises(exercise);
                        let num = numberOfExercises.filter((item, index) => index !== i);
                        setNumberOfExercises(num);
                      }}
                    >
                      Excluir
                    </ButtonCancel>
                  </SheetLabelGroup>
                </SheetSection>
              );
            })}
            {numberOfExercises.length < 10 ? (
              <SheetSection>
                <IconsSheet
                  src={moreIcon}
                  onClick={() => {
                    exerciseData();
                    let num = numberOfExercises;
                    num.push(Math.random());
                    setNumberOfExercises(num);
                    let newExercise = exercises;
                    newExercise.push(exerciseStack);
                    setExercises(newExercise);
                  }}
                ></IconsSheet>
              </SheetSection>
            ) : null}
            {numberOfExercises.length >= 5 ? (
              <ButtonFilled type="submit">Salvar!</ButtonFilled>
            ) : null}
          </FormSheet>
        </Sheet>
      </SectionV>
    </ContainerV>
  );
};

export default Create;
