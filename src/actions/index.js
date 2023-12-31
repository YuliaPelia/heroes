export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
export const deleteItem = (id) => ({
  type: "DELETE_ITEM",
  payload: id,
});
export const addHero = (hero) => {
  return {
    type: "ADD_HERO",
    payload: hero,
  };
};
export const setFilter = (filter) => ({
  type: "SET_FILTER",
  filter,
});
