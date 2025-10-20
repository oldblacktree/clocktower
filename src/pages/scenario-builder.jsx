import { useState } from "react";
import { roles as rolesAll } from "../data/roles";

import { useNavigate } from "react-router-dom";

export default function ScenarioBuilder({ scenarioRoles, setScenarioRoles }) {
  const navigate = useNavigate();
  // если включен режим "только выбранные", то фильтруем массив

  const [scenarioName, setScenarioName] = useState("");

  const saveScenario = () => {
    if (!scenarioName.trim()) {
      return;
    }

    const newScenario = {
      id: Date.now(),
      name: scenarioName,
      roles: scenarioRoles.map((item) => item.id),
    };

    const existing = JSON.parse(localStorage.getItem("customScenarios")) || [];
    const updated = [...existing, newScenario];
    localStorage.setItem("customScenarios", JSON.stringify(updated));
    navigate("/");
  };

  const toggleRoleScenario = (role) => {
    if (scenarioRoles.find((r) => r.id === role.id)) {
      // если выбрана → убираем
      setScenarioRoles(scenarioRoles.filter((r) => r.id !== role.id));
    } else {
      // если нет → добавляем
      setScenarioRoles([...scenarioRoles, role]);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Все роли */}
      <div>
        <h4 className={`text-yellow-500  text-lg`}>Горожане</h4>
        <div className="grid grid-cols-4 gap-4 py-2">
          {rolesAll
            .filter((item) => item.type === "townsfolk")
            .map((role) => {
              const isSelected = scenarioRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRoleScenario(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b]
                  ${isSelected ? "border-purple-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
        </div>
        <h4 className={`text-yellow-500 text-lg`}>Изгои</h4>
        <div className="grid grid-cols-4 gap-4 py-2">
          {rolesAll
            .filter((item) => item.type === "outsider")
            .map((role) => {
              const isSelected = scenarioRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRoleScenario(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#192429]
                  ${isSelected ? "border-purple-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
        </div>
        <h4 className={`text-yellow-500  text-lg`}>Приспешники</h4>
        <div className="grid grid-cols-4 gap-4 py-2">
          {rolesAll
            .filter((item) => item.type === "minion")
            .map((role) => {
              const isSelected = scenarioRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRoleScenario(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#312a2b]
                  ${isSelected ? "border-purple-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
        </div>
        <h4 className={`text-yellow-500  text-lg`}>Демоны</h4>
        <div className="grid grid-cols-4 gap-4 py-2">
          {rolesAll
            .filter((item) => item.type === "demon")
            .map((role) => {
              const isSelected = scenarioRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRoleScenario(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#2f1c1f]
                  ${isSelected ? "border-purple-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* Фиксированная кнопка снизу */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 ">
        {/* Поле и кнопка сохранения */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/")}
            className="  w-10 h-10 flex items-center justify-center
                 bg-gray-800 hover:bg-gray-700 text-yellow-400 rounded-lg 
                 shadow-lg border border-yellow-500 transition"
            aria-label="Назад"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
          <input
            type="text"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            placeholder="Название сценария"
            className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={saveScenario}
            className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-500"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
