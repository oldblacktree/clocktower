import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles as rolesObjectAll } from "../data/roles";
import { scenariosStandart } from "../data/roles";
import ScenarioRoles from "../components/ScenarioRoles";

export default function ScenarioSelect({ setSelectedRoles }) {
  const navigate = useNavigate();
  const [customScenarios, setCustomScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [showScenarioRoles, setShowScenarioRoles] = useState(false);
  const [rolesObjects, setRolesObjects] = useState([]);

  function getRolesByIds(roles) {
    return rolesObjectAll.filter((rolesObject) =>
      roles.includes(rolesObject.id)
    );
  }

  const handleScenarioClick = (id) => {
    // если кликнули по тому же сценарию — скрываем кнопки
    if (selectedScenarioId === id) {
      setSelectedScenarioId(null);
    } else {
      setSelectedScenarioId(id);
    }
  };

  const handleShowScenarioRolesClick = (scenario) => {
    let roles = getRolesByIds(scenario.roles);
    setShowScenarioRoles(true);
    setRolesObjects(roles);
  };

  // Загружаем сценарии из localStorage при загрузке страницы
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customScenarios")) || [];
    setCustomScenarios(stored);
  }, []);

  // Открыть выбранный сценарий
  // const openScenario = (scenario) => {
  //   setSelectedRoles(scenario.roles);
  //   navigate("/scenario");
  // };

  // Удалить сценарий
  const deleteScenario = (id) => {
    const confirmDelete = window.confirm("Удалить этот сценарий?");
    if (!confirmDelete) return;

    const updated = customScenarios.filter((sc) => sc.id !== id);
    setCustomScenarios(updated);
    localStorage.setItem("customScenarios", JSON.stringify(updated));
  };

  // const selectScenario = (scenario) => {
  //   setSelectedRoles(scenario.roles);
  //   navigate("/scenario");
  // };

  const createCustomScenario = () => {
    setSelectedRoles([]);
    navigate("/scenario-builder");
  };

  return (
    <div className="p-6 space-y-6">
      {!showScenarioRoles && (
        <div>
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">
            Выбери сценарий
          </h1>

          {/* Список пользовательских сценариев */}
          {customScenarios.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-2">
                Мои сценарии
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customScenarios.map((scenario) => (
                  <div key={scenario.id}>
                    <div
                      className={`text-white transition flex border ${
                        selectedScenarioId === scenario.id
                          ? "border-yellow-200"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className="w-80 p-2 bg-gray-800 "
                        onClick={() => handleScenarioClick(scenario.id)}
                      >
                        <h3 className="text-xl font-semibold">
                          {scenario.name}
                        </h3>
                      </div>

                      {/* Кнопка удаления */}
                      <button
                        onClick={(e) => {
                          // e.stopPropagation(); // чтобы не срабатывал выбор сценария
                          deleteScenario(scenario.id);
                        }}
                        className="right-2 text-gray-300 bg-red-800  transition w-10 text-3xl"
                        title="Удалить сценарий"
                      >
                        🗑
                      </button>
                    </div>
                    {/* Если этот сценарий выбран — показываем кнопки */}
                    {selectedScenarioId === scenario.id && (
                      <div className=" flex gap-2 mt-1">
                        <button
                          onClick={(e) => {
                            handleShowScenarioRolesClick(scenario);
                          }}
                          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
                        >
                          Посмотреть роли
                        </button>

                        <button
                          onClick={(e) => {
                            handleShowScenarioRolesClick(scenario);
                          }}
                          className="flex-1 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition"
                        >
                          Выбрать
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Список стандартных сценариев */}
          {customScenarios.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-2">
                Стандартные сценарии
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scenariosStandart.map((scenario) => (
                  <div key={scenario.id}>
                    <div
                      className={`text-white transition flex border ${
                        selectedScenarioId === scenario.id
                          ? "border-yellow-200"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className="w-100 p-2 bg-gray-800 "
                        onClick={() => handleScenarioClick(scenario.id)}
                      >
                        <h3 className="text-xl font-semibold">
                          {scenario.name}
                        </h3>
                      </div>
                    </div>
                    {/* Если этот сценарий выбран — показываем кнопки */}
                    {selectedScenarioId === scenario.id && (
                      <div className=" flex gap-2 mt-1">
                        <button
                          onClick={(e) => {
                            handleShowScenarioRolesClick(scenario);
                          }}
                          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
                        >
                          Посмотреть роли
                        </button>

                        <button
                          onClick={(e) => {
                            handleShowScenarioRolesClick(scenario);
                          }}
                          className="flex-1 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition"
                        >
                          Выбрать
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            onClick={createCustomScenario}
            className="p-4 bg-indigo-800 text-white rounded-xl transition mt-4"
          >
            <h2 className="text-xl font-semibold">Создать свой сценарий</h2>
          </div>
        </div>
      )}

      {showScenarioRoles && (
        <div>
          <ScenarioRoles roles={rolesObjects} />
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 ">
            <button
              onClick={() => setShowScenarioRoles(false)}
              className="fixed right-3 top-3  w-10 h-10 flex items-center justify-center
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
          </div>
        </div>
      )}
    </div>
  );
}
