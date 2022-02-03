import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/api";
import moreIcon from "../../../assets/icons/more.svg";
import {
  ButtonAccept,
  ButtonCancel,
  ButtonFilled,
  ContainerV,
  SectionV,
  Title,
} from "../../styles";
import {
  IconsSheet,
  Option,
  Selector,
  SelectorSheet,
  Sheet,
  SheetFormSection,
  SheetLabel,
  SheetLabelGroup,
  SheetSection,
} from "../style";
import Loader from "../../Loader";

const Create = () => {
  const [day, setDay] = useState(1);
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

  const methods = [
    "Múltiplas séries",
    "Pirâmide",
    "Bi-Set",
    "Tri-Set",
    "Super série",
    "Agonista/Antagonista",
    "Pré-Exaustão",
    "Exaustão ou Falha",
    "Negativa ou Excêntrica",
    "Blitz",
    "Dropset",
    "Roubada",
    "Repetição forçada",
  ];

  const exerciseStack = {
    series: 1,
    repetitions: 1,
    load: 0,
    method: methods[0],
    interval: 0,
    id_exercise: "",
  };

  const exerciseData = async () => {
    try {
      setLoader(true);
      await api.get("/exerciseList").then((response) => {
        setExerciseList(response.data);
        exerciseStack.id_exercise = response.data[0].id;
        setLoader(false);
      });
    } catch (error) {
      setLoader(false);
      toast.error("Erro ao buscar exercícios");
    }
  };

  const checkExercisesExistence = async () => {
    const existExercises = await JSON.parse(
      sessionStorage.getItem("exercises")
    );
    return existExercises && existExercises.length >= 5
      ? true
      : toast.warn("Salve os exercícios para poder salvar seu dia de treino");
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

  const postExercise = async (index) => {
    setLoader(true);
    try {
      await api.post("/exercise", exercises[index]).then(async (response) => {
        const exerciseId = response.data.id;
        const exercisesSaved =
          (await JSON.parse(sessionStorage.getItem("exercises"))) || null;
        const exercisesArray = exercisesSaved
          ? [...exercisesSaved, exerciseId]
          : [exerciseId];
        console.log(exercisesArray);
        sessionStorage.setItem("exercises", JSON.stringify(exercisesArray));
        toast.success("Exercício salvo com sucesso!");
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Error ao salvar o dia");
    }
    setLoader(false);
  };

  const postWeekDay = async () => {
    setLoader(true);
    if ((await checkExercisesExistence()) !== true) {
      setLoader(false);
      return;
    }
    const exercisesArray = await JSON.parse(
      sessionStorage.getItem("exercises")
    );
    let listOfExercises = { week_day: day };
    for (let i = 0; i < exercisesArray.length; i++) {
      let num = i < 9 ? "0" + (i + 1) : i + 1;
      Object.defineProperty(listOfExercises, `id_exercise_${num}`, {
        value: exercisesArray[i],
        enumerable: true,
      });
    }
    try {
      await api.post(`/weekDay`, listOfExercises).then(async (response) => {
        const existingDay = response.data.id;
        const weekDays = (await sessionStorage.getItem("weekDays")) || null;
        const weekDaysArray = weekDays
          ? [...weekDays, existingDay]
          : [existingDay];
        console.log(weekDaysArray);
        sessionStorage.setItem("weekDays", JSON.stringify(weekDaysArray));
        toast.success("Dia salvo com sucesso!");
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao salvar o dia da semana");
    }
    setLoader(false);
  };

  return (
    <ContainerV>
      <Loader active={loader} text={"Buscando dados..."} />
      <SectionV>
        <Title>Criar ficha de treino</Title>
        <Sheet>
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
              <SheetFormSection
                key={value}
                onSubmit={(event) => {
                  event.preventDefault();
                  for (let i = 0; i < event.target.length; i++) {
                    event.target[i].disabled = true;
                  }
                  postExercise(i);
                }}
              >
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
                  <Selector
                    onChange={(event) => changingValues(event, i, "method")}
                    required
                    id="method"
                  >
                    {methods.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Selector>
                </SheetLabelGroup>
                <SheetLabelGroup>
                  <ButtonAccept type="submit">Salvar</ButtonAccept>
                  <ButtonCancel
                    type="button"
                    onClick={() => {
                      let exercise = exercises.filter(
                        (item, index) => index !== i
                      );
                      setExercises(exercise);
                      let num = numberOfExercises.filter(
                        (item, index) => index !== i
                      );
                      setNumberOfExercises(num);
                    }}
                  >
                    Excluir
                  </ButtonCancel>
                </SheetLabelGroup>
              </SheetFormSection>
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
            <ButtonFilled onClick={postWeekDay}>Salvar!</ButtonFilled>
          ) : null}
        </Sheet>
      </SectionV>
    </ContainerV>
  );
};

export default Create;
