const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_ITEM":
      // console.log("Filtered heroes:", "done");

      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };
    case "ADD_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default reducer;
