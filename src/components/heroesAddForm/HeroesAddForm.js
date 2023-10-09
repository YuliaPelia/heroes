import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHero } from "../../actions";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const dispatch = useDispatch();

  const [newHero, setNewHero] = useState({
    name: "",
    text: "",
    element: "fire", // За замовчуванням вибрано "Огонь"
  });

  const { name, text, element } = newHero;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHero({ ...newHero, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Відправка нового героя на сервер
      const response = await fetch("http://localhost:3001/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      });
      if (response.ok) {
        const data = await response.json();
        // Додавання нового героя до Redux стейту
        dispatch(addHero(data));
        console.log("Новий герой доданий успішно");
      } else {
        console.error("Помилка додавання героя");
      }
    } catch (error) {
      console.error("Помилка під час додавання героя", error);
    }
    setNewHero({
      name: "",
      text: "",
      element: "fire",
    });
  };
  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          value={text}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={element}
          onChange={handleChange}
        >
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
