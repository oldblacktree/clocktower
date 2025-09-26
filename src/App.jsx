import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import {
  roleLayoutsAll,
  demonsAll,
  minionsAll,
  outsidersAll,
  townsfolksAll,
} from "./constant";

let roleLayout, demons, minions, outsiders, townsfolks;

function App() {
  const [gamersNumber, setGamersNumber] = useState("");
  const [isGenerateRoleClick, generateRoleClick] = useState(false);

  function handleGenerateRoleClick() {
    generateRoleClick(true);
    pickRoles(gamersNumber);

    console.log("asdf");
  }

  return (
    <>
      <Timer />
      <div className="generate container">
        <span>Игроков:</span>
        <input
          type="number"
          className="input-gamers-number"
          value={gamersNumber}
          onChange={(e) => setGamersNumber(e.target.value)}
        />
        <button onClick={() => handleGenerateRoleClick()}>Сгенерировать</button>
      </div>

      <div className="roles">
        <div className="role">
          <p>Демон:</p>
          <ul>
            {demons &&
              demons.map((item, index) => <li key={index}>{item.nameRu}</li>)}
          </ul>
        </div>
        <div className="role">
          <p>Приспешники:</p>
          <ul>
            {minions &&
              minions.map((item, index) => <li key={index}>{item.nameRu}</li>)}
          </ul>
        </div>
        <div className="role">
          <p>Изгои:</p>
          <ul>
            {outsiders &&
              outsiders.map((item, index) => (
                <li key={index}>{item.nameRu}</li>
              ))}
          </ul>
        </div>
        <div className="role">
          <p>Горожане:</p>
          <ul>
            {townsfolks &&
              townsfolks.map((item, index) => (
                <li key={index}>{item.nameRu}</li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

//выбирает рандомныt items из массива
function getRandomItems(arr, count = 1) {
  if (!arr || arr.length === 0 || count <= 0) return [];

  // Копируем массив, чтобы не изменять оригинал
  const copy = [...arr];
  const result = [];

  // Берём случайные элементы
  for (let i = 0; i < count && copy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1); // удаляем выбранный элемент, чтобы не повторялся
  }

  return result;
}

//сделать раскладку по персонажам
function pickRoles(playersNumber) {
  roleLayout = roleLayoutsAll[playersNumber];

  demons = getRandomItems(demonsAll, roleLayout.demons);
  changeOutsidersNumber(demons);

  minions = getRandomItems(minionsAll, roleLayout.minions);
  changeOutsidersNumber(minions);

  outsiders = getRandomItems(outsidersAll, roleLayout.outsiders);
  townsfolks = getRandomItems(townsfolksAll, roleLayout.townsfolks);
}

function changeOutsidersNumber(arr) {
  arr.forEach((role) => {
    if (role.hasOwnProperty("outsiderMod")) {
      if (typeof role.outsiderMod === "number") {
        roleLayout.outsiders = roleLayout.outsiders + role.outsiderMod;
        roleLayout.townsfolks = roleLayout.townsfolks - role.outsiderMod;

        console.log(
          role.nameRu + "изменил число изгоев на " + role.outsiderMod
        );
      }
      if (Array.isArray(role.outsiderMod)) {
        let number = getRandomItems(role.outsiderMod)[0];
        roleLayout.outsiders = roleLayout.outsiders + number;
        roleLayout.townsfolks = roleLayout.townsfolks - number;

        console.log(role.nameRu + "изменил число изгоев на " + number);
      }
    }
  });
}
