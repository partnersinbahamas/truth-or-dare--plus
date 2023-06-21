import { client } from "./fetchProd.ts";

export const getAllActions = (setAllActions, mode, lang) => {
    let allActionsData = [];

    if (mode !== undefined) {
      for (const q of mode.questions[lang]) {
        let newId = 0;

        for (let i = 0; i < allActionsData.length; i++) {
          const currentId = allActionsData[i].id;
  
          if (currentId >= newId) {
            newId = currentId + 1;
          }
        }

        allActionsData.push({...q, id: newId})
      }

      for (const d of mode.dare[lang]) {
        let newId = 0;

        for (let i = 0; i < allActionsData.length; i++) {
          const currentId = allActionsData[i].id;

          if (currentId >= newId) {
            newId = currentId + 1;
          }
        }

        allActionsData.push({...d, id: newId})
      }
    }

    setAllActions(allActionsData)

  };

  export const setDataWithIndexes = (setTo, array) => {
    let data = [];

      for (const q of array) {
        let newId = 0;

        for (let i = 0; i < data.length; i++) {
          const currentId = data[i].id;
  
          if (currentId >= newId) {
            newId = currentId + 1;
          }
        }

        data.push({...q, id: newId})
      }

      // return data;
      setTo(data);
  }

  export const onSquadRemove = (setSquads, squads, setSquad, squad, setPlayers) => {
    setSquads((current) => [...current].filter((item) => item.id !== squad.id));

    const index = squads.findIndex((s) => s.id === squad.id);
    const prevSquad = squads[index - 1];
    const nextSquad = squads[index + 1];

    if (prevSquad === undefined && nextSquad) {
      setSquad(nextSquad);
      setPlayers(nextSquad);
    } 

    if (nextSquad === undefined && prevSquad) {
      setSquad(prevSquad);
      setPlayers(prevSquad);
    }

    if (nextSquad && prevSquad) {
      setSquad(prevSquad);
      setPlayers(prevSquad);
    }

    if (nextSquad === undefined && prevSquad === undefined) {
      setSquad({id: null});
      setPlayers([]);
    }
  }

  // const onSquadSelect = () => {
  //   setSquad(currentSquad);
  //   onSetPlayer(currentSquad);
  // }


  export const getDatas = (url) => {
    return client.get(url);
  }

