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

  setTo(data);
}
