// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../actions";

const HeroesFilters = () => {
  const activeFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <button
            className={`btn btn-dark  ${
              activeFilter === "all" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("all")}
          >
            Все
          </button>
          <button
            className={`btn btn-danger ${
              activeFilter === "fire" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("fire")}
          >
            Огонь
          </button>
          <button
            className={`btn btn-primary ${
              activeFilter === "water" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("water")}
          >
            Вода
          </button>
          <button
            className={`btn btn-success ${
              activeFilter === "wind" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("wind")}
          >
            Ветер
          </button>
          <button
            className={`btn btn-secondary ${
              activeFilter === "earth" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("earth")}
          >
            Земля
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
