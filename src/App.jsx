import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import ScenarioBuilder from "./pages/scenario-builder";
import Setup from "./pages/setup";
import Guiding from "./pages/guiding";
import ScenarioSelect from "./pages/scenario-select";
import RolePicking from "./pages/role-picking";
import "./App.css";
import { roles as allRoles } from "./data/roles";

function App() {
  const [selectedRoles, setSelectedRoles] = useState([]); // роли всего сценария
  const [playersRoles, setPlayersRoles] = useState([]); // роли игроков
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [playerCount, setPlayerCount] = useState(5);

  // Загрузка сохранённого сценария из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customScenario");
    if (saved) {
      setSelectedRoles(JSON.parse(saved));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Верхняя панель навигации */}
        {/* <nav className="flex justify-around bg-gray-800 text-white">
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
        </nav> */}

        {/* Основное содержимое */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <ScenarioSelect
                  setSelectedRoles={setSelectedRoles}
                  allRoles={allRoles}
                />
              }
            />
            <Route
              path="/clocktower"
              element={
                <ScenarioSelect
                  setSelectedRoles={setSelectedRoles}
                  allRoles={allRoles}
                />
              }
            />
            <Route
              path="/scenario-builder"
              element={
                <ScenarioBuilder
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                  showSelectedOnly={showSelectedOnly}
                  setShowSelectedOnly={setShowSelectedOnly}
                  playersRoles={playersRoles}
                  setPlayersRoles={setPlayersRoles}
                />
              }
            />
            <Route
              path="/role-picking"
              element={
                <RolePicking
                  playerCount={playerCount}
                  setPlayerCount={setPlayerCount}
                />
              }
            />
            {/* <Route
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
            <Route path="/night-order" element={<Guiding />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
