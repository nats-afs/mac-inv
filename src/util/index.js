export const retrieveModels = function (key, models) {
  let items = [];
  for (let key in models) {
    items.push({
      uid: key,
      name: models[key].name,
      description: models[key].description,
    });
  }
  return items
}

export const retrieveProjects = function (key, models) {
  let items = [];
  for (let key in models) {
    items.push({
      uid: key,
      name: models[key].name,
      description: models[key].description,
      contractor: models[key].contractor,
      dateInit: models[key].dateInit,
      dateEnd: models[key].dateEnd,
      createAt: models[key].createAt,
      amount: models[key].amount,
    });
  }
  return items
}

export const retrieveStore = function (key, models) {
  let items = [];
  for (let key in models) {
    items.push({
      uid: key,
      nroSerie: models[key].nroSerie,
      model: models[key].model,
      nroInventario: models[key].nroInventario,
      createAt: models[key].createAt,
    });
  }
  return items
}
