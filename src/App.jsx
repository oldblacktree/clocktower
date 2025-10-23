import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import ScenarioBuilder from "./pages/scenario-builder";
import ScenarioSelect from "./pages/scenario-select";
import PlayersRoles from "./pages/players-roles";
import RolePicking from "./pages/role-picking";
import Table from "./pages/table";
import "./App.css";
import { roles as allRoles } from "./data/roles";

function App() {
  const [scenarioRoles, setScenarioRoles] = useState([]); // роли всего сценария
  const [playersRoles, setPlayersRoles] = useState([]); // роли игроков
  const [playerCount, setPlayerCount] = useState(5);

  // Загрузка сохранённого сценария из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customScenario");
    if (saved) {
      setScenarioRoles(JSON.parse(saved));
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
                  setScenarioRoles={setScenarioRoles}
                  allRoles={allRoles}
                />
              }
            />
            <Route
              path="/clocktower"
              element={
                <ScenarioSelect
                  setScenarioRoles={setScenarioRoles}
                  allRoles={allRoles}
                />
              }
            />
            <Route
              path="/scenario-builder"
              element={
                <ScenarioBuilder
                  scenarioRoles={scenarioRoles}
                  setScenarioRoles={setScenarioRoles}
                />
              }
            />
            <Route
              path="/role-picking"
              element={
                <RolePicking
                  playerCount={playerCount}
                  setPlayerCount={setPlayerCount}
                  scenarioRoles={scenarioRoles}
                  playersRoles={playersRoles}
                  setPlayersRoles={setPlayersRoles}
                />
              }
            />
            <Route
              path="/players-roles"
              element={
                <PlayersRoles
                  playerCount={playerCount}
                  playersRoles={playersRoles}
                  scenarioRoles={scenarioRoles}
                  setPlayersRoles={setPlayersRoles}
                />
              }
            />
            <Route
              path="/table"
              element={
                <Table
                  playerCount={playerCount}
                  playersRoles={playersRoles}
                  scenarioRoles={scenarioRoles}
                  setPlayersRoles={setPlayersRoles}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
