import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/api";
import moreIcon from "../../../assets/icons/more.svg";
import lessIcon from "../../../assets/icons/less.svg";
import {
  ButtonFilled,
  ContainerV,
  SectionH,
  SectionV,
  Title,
} from "../../styles";
import {
  IconsLessSheet,
  IconsSheet,
  InputSheet,
  Option,
  Selector,
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
  useEffect(() => {
    let mounted = true;
    const exerciseData = async () => {
      try {
        await api.get("/exerciseList").then((response) => {
          setLoader(true);
          if (mounted) {
            setExerciseList(response.data);
            setLoader(false);
          }
        });
      } catch (error) {
        setLoader(false);
        toast.error("Erro ao buscar exercícios");
      }
    };
    exerciseData();
    return () => {
      mounted = false;
    };
  }, [exerciseList]);

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

  const postExercise = async () => {
    let exercisesList = {
      week_day: day,
      id_exercise_01: "",
      id_exercise_02: "",
      id_exercise_03: "",
      id_exercise_04: "",
      id_exercise_05: "",
      id_exercise_06: "",
      id_exercise_07: "",
      id_exercise_08: "",
      id_exercise_09: "",
      id_exercise_10: "",
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
            exercisesList[`id_exercise_0${i + 1}`] = response.data.id;
            setLoader(false);
          });
      } catch (error) {
        setLoader(false);
        toast.error("Erro ao salvar a ficha");
      }
    });

    try {
      await api.post("/weekDay", exercisesList).then((response) => {
        if (!sessionStorage.getItem("training_sheet")) {
          sessionStorage.setItem("training_sheet", response.data.id);
        }else{
          const trainingSheet = sessionStorage.getItem("training_sheet")
          sessionStorage.setItem("training_sheet", {...trainingSheet, });
        }
      });
    } catch (error) {
      
    }
    // console.log(exercisesList);
  };

  return (
    <ContainerV>
      <Loader active={loader} />
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

          <IconsLessSheet
            src={lessIcon}
            onClick={() => {
              let num = numberOfExercises;
              num.pop();
              setNumberOfExercises(num);
              let newExercise = exercises;
              newExercise.pop();
              setExercises(newExercise);
            }}
          />

          {numberOfExercises.map((value, i) => {
            return (
              <SheetSection key={i}>
                <Selector
                  onChange={(event) => changingValues(event, i, "id_exercise")}
                >
                  {exerciseList.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.exercise}
                    </Option>
                  ))}
                </Selector>
                <SheetLabelGroup>
                  <SheetLabel htmlFor="series">Séries</SheetLabel>
                  <InputSheet
                    value={exercises[i].series}
                    onChange={(event) => changingValues(event, i, "series")}
                    id="series"
                    type="number"
                    min="1"
                    placeholder="Séries"
                  />
                </SheetLabelGroup>
                <SheetLabelGroup>
                  <SheetLabel htmlFor="repetitions">Repetições</SheetLabel>
                  <InputSheet
                    value={exercises[i].repetitions}
                    onChange={(event) =>
                      changingValues(event, i, "repetitions")
                    }
                    id="repetitions"
                    type="number"
                    min="1"
                    placeholder="Repetições"
                  />
                </SheetLabelGroup>
                <SheetLabelGroup>
                  <SheetLabel htmlFor="load">Carga</SheetLabel>
                  <InputSheet
                    value={exercises[i].load}
                    onChange={(event) => changingValues(event, i, "load")}
                    id="load"
                    type="number"
                    min="0"
                    placeholder="Carga"
                  />
                </SheetLabelGroup>
                <SheetLabelGroup>
                  <SheetLabel htmlFor="method">Método</SheetLabel>
                  <InputSheet id="method" type="text" placeholder="Método" />
                </SheetLabelGroup>
                <SheetLabelGroup>
                  <SheetLabel htmlFor="interval">Intervalo</SheetLabel>
                  <InputSheet
                    value={exercises[i].interval}
                    onChange={(event) => changingValues(event, i, "interval")}
                    id="interval"
                    type="number"
                    min="0"
                    placeholder="Intervalo"
                  />
                </SheetLabelGroup>
              </SheetSection>
            );
          })}
          {numberOfExercises.length < 10 ? (
            <SheetSection>
              <IconsSheet
                src={moreIcon}
                onClick={() => {
                  let num = numberOfExercises;
                  num.push(num[num.length - 1] + 1);
                  setNumberOfExercises(num);
                  let newExercise = exercises;
                  newExercise.push(exerciseStack);
                  setExercises(newExercise);
                }}
              ></IconsSheet>
            </SheetSection>
          ) : null}
          {numberOfExercises.length >= 5 ? (
            <ButtonFilled onClick={postExercise}>Salvar!</ButtonFilled>
          ) : null}
        </Sheet>
      </SectionV>
    </ContainerV>
  );
};

export default Create;
