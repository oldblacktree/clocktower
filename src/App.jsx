import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ScenarioBuilder from "./pages/scenarioBuilder";
import Setup from "./pages/setup";
import Guiding from "./pages/guiding";
import "./App.css";

import {
  roleLayouts,
  demons,
  minions,
  outsiders,
  townsfolks,
} from "./constant";

let roleLayout, demon, minion, outsider, townsfolk;

function App() {
  const [gamersNumber, setGamersNumber] = useState("");
  const [isGenerateRole, generateRole] = useState(false);

  function handleGenerateRoleClick() {
    generateRole(true);

    roleLayout = roleLayouts[gamersNumber];
    demon = getRandomItems(demons, roleLayout.demons)[0];

    // если демон изменяет число изгоев
    if (demon.hasOwnProperty("outsiderMod")) {
      if (typeof demon.outsiderMod === "number") {
        roleLayout.outsiders = roleLayout.outsiders + demon.outsiderMod;
        roleLayout.townsfolks = roleLayout.townsfolks - demon.outsiderMod;
      }
    }
  }

  return (
    <BrowserRouter>
      {/* <>
        <div className="generate container">
          <span>Игроков:</span>
          <input
            type="number"
            className="input-gamers-number"
            value={gamersNumber}
            onChange={(e) => setGamersNumber(e.target.value)}
          />
          <button
            onClick={() => handleGenerateRoleClick()}
            disabled={isGenerateRole}
          >
            Сгенерировать
          </button>
        </div>

        {isGenerateRole && (
          <div className="roles">
            <div>
              <p>Демон:</p>
              <p>{demon.nameRu}</p>
            </div>
            <div>
              <p>Приспешники:</p>
              <p></p>
            </div>
          </div>
        )}
      </> */}

      <div className="flex flex-col h-screen">
        {/* Верхняя панель навигации */}
        <nav className="flex justify-around bg-gray-800 text-white p-3">
          <NavLink
            to="/scenario-builder"
            className={({ isActive }) =>
              "flex flex-col items-center " +
              (isActive ? "text-yellow-400" : "")
            }
          >
            📜
            <span className="text-xs">Сценарии</span>
          </NavLink>
          <NavLink
            to="/setup"
            className={({ isActive }) =>
              "flex flex-col items-center " +
              (isActive ? "text-yellow-400" : "")
            }
          >
            🎭
            <span className="text-xs">Игроки</span>
          </NavLink>
          <NavLink
            to="/night-order"
            className={({ isActive }) =>
              "flex flex-col items-center " +
              (isActive ? "text-yellow-400" : "")
            }
          >
            🌙
            <span className="text-xs">Ночь</span>
          </NavLink>
        </nav>

        {/* Основное содержимое */}
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/scenario-builder" element={<ScenarioBuilder />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/night-order" element={<Guiding />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

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

// Пример использования
const characters = ["Demons", "Minions", "Outsiders", "Townsfolks"];
const randomCharacters = getRandomItems(characters, 3);
console.log(randomCharacters);
