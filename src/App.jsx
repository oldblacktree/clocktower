import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ScenarioBuilder from "./pages/scenario";
import Setup from "./pages/setup";
import Guiding from "./pages/guiding";
import "./App.css";

function App() {
  const [selectedRoles, setSelectedRoles] = useState([
    {
      id: "huntsman",
      name: "Huntsman",
      nameRu: "Егерь",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "gossip",
      name: "Gossip",
      nameRu: "Сплетница",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "innkeeper",
      name: "Innkeeper",
      nameRu: "Хозяин таверны",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "heretic",
      name: "Heretic",
      nameRu: "Еретик",
      type: "outsider",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "saint",
      name: "Saint",
      nameRu: "Святой",
      type: "outsider",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "damsel",
      name: "Damsel",
      nameRu: "Дамочка",
      type: "outsider",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "marionette",
      name: "Marionette",
      nameRu: "Марионетка",
      type: "minion",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "eviltwin",
      name: "Eviltwin",
      nameRu: "Злой близнец",
      type: "minion",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "witch",
      name: "Witch",
      nameRu: "Ведьма",
      type: "minion",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "nodashii",
      name: "Nodashii",
      nameRu: "Но Даши",
      type: "demon",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "pukka",
      name: "Pukka",
      nameRu: "Пукка",
      type: "demon",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "chef",
      name: "Chef",
      nameRu: "Повар",
      type: "townsfolk",
      firstNight: 4,
      otherNights: null,
    },
    {
      id: "balloonist",
      name: "Balloonist",
      nameRu: "Аэронавт",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "banshee",
      name: "Banshee",
      nameRu: "Банши",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "clockmaker",
      name: "Clockmaker",
      nameRu: "Часовщик",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "cannibal",
      name: "Cannibal",
      nameRu: "Каннибал",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "courtier",
      name: "Courtier",
      nameRu: "Придворный",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "fool",
      name: "Fool",
      nameRu: "Шут",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "grandmother",
      name: "Grandmother",
      nameRu: "Бабушка",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "librarian",
      name: "Librarian",
      nameRu: "Библиотекарь",
      type: "townsfolk",
      firstNight: 2,
      otherNights: null,
    },
    {
      id: "investigator",
      name: "Investigator",
      nameRu: "Сыщик",
      type: "townsfolk",
      firstNight: 3,
      otherNights: null,
    },
    {
      id: "tinker",
      name: "Tinker",
      nameRu: "Механик",
      type: "outsider",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "mezepheles",
      name: "Mezepheles",
      nameRu: "Мецефель",
      type: "minion",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "alhadikhia",
      name: "Alhadikhia",
      nameRu: "Аль-Адихия",
      type: "demon",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "kazali",
      name: "Kazali",
      nameRu: "Казил",
      type: "demon",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "orthodontist",
      name: "Orthodontist",
      nameRu: "Ортодонт",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "washerwoman",
      name: "Washerwoman",
      nameRu: "Прачка",
      type: "townsfolk",
      firstNight: 1,
      otherNights: null,
    },
    {
      id: "virgin",
      name: "Virgin",
      nameRu: "Девственница",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "tea_lady",
      name: "Tea Lady",
      nameRu: "Чайная Леди",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
    {
      id: "towncrier",
      name: "towncrier",
      nameRu: "Глашатай",
      type: "townsfolk",
      firstNight: null,
      otherNights: null,
    },
  ]); // роли всего сценария
  const [playersRoles, setPlayersRoles] = useState([]); // роли игроков
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [playerCount, setPlayerCount] = useState(5);
  const [hiddenPlayerCount, hidePlayerCount] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Верхняя панель навигации */}
        <nav className="flex justify-around bg-gray-800 text-white">
          <NavLink
            to="/scenario"
            className={({ isActive }) =>
              "flex-1 text-center py-2 px-3  transition text-lg " +
              (isActive
                ? "bg-gray-700 text-white-400 border-b-4 border-yellow-500"
                : "hover:bg-gray-700 text-indigo-300")
            }
          >
            Сценарий
          </NavLink>

          <NavLink
            to="/setup"
            className={({ isActive }) =>
              "flex-1 text-center py-2 px-3  transition text-lg " +
              (isActive
                ? "bg-gray-700 text-white-400 border-b-4 border-yellow-500"
                : "hover:bg-gray-700 text-indigo-300")
            }
          >
            Генерация
          </NavLink>

          <NavLink
            to="/night-order"
            className={({ isActive }) =>
              "flex-1 text-center py-2 px-3  transition text-lg " +
              (isActive
                ? "bg-gray-700 text-white-400 border-b-4 border-yellow-500"
                : "hover:bg-gray-700 text-indigo-300")
            }
          >
            Ночь
          </NavLink>
        </nav>

        {/* Основное содержимое */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/scenario"
              element={
                <ScenarioBuilder
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                  showSelectedOnly={showSelectedOnly}
                  setShowSelectedOnly={setShowSelectedOnly}
                  hiddenPlayerCount={hiddenPlayerCount}
                  hidePlayerCount={hidePlayerCount}
                  playerCount={playerCount}
                  setPlayerCount={setPlayerCount}
                  playersRoles={playersRoles}
                  setPlayersRoles={setPlayersRoles}
                />
              }
            />
            <Route
              path="/setup"
              element={
                <Setup
                  selectedRoles={selectedRoles}
                  playerCount={playerCount}
                  setPlayerCount={setPlayerCount}
                  hiddenPlayerCount={hiddenPlayerCount}
                  hidePlayerCount={hidePlayerCount}
                />
              }
            />
            <Route path="/night-order" element={<Guiding />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
