import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteItem,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => {
        console.log(data);
        // dispatch(deleteItem(data)); // my
        dispatch(heroesFetched(data));
      })
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const deleteHero = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/heroes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        deleteItem(id);
        console.log("cools");
      } else {
        console.error("Помилка видалення героя");
      }
    } catch (error) {
      console.error("Помилка під час видалення героя", error);
    }
  };
  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ ...props }, id) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          deleteItem={deleteItem(id)}
          deleteHero={deleteHero}
          // addItem={addHeroNew}
        />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default connect(null, { deleteItem })(HeroesList);
