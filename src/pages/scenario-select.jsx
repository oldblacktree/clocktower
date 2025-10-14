import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scenariosStandart } from "../data/roles";

export default function ScenarioSelect({ setSelectedRoles }) {
  const navigate = useNavigate();
  const [customScenarios, setCustomScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  const handleScenarioClick = (id) => {
    // если кликнули по тому же сценарию — скрываем кнопки
    if (selectedScenarioId === id) {
      setSelectedScenarioId(null);
    } else {
      setSelectedScenarioId(id);
    }
  };

  // Загружаем сценарии из localStorage при загрузке страницы
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customScenarios")) || [];
    setCustomScenarios(stored);
  }, []);

  // Открыть выбранный сценарий
  const openScenario = (scenario) => {
    setSelectedRoles(scenario.roles);
    navigate("/scenario");
  };

  // Удалить сценарий
  const deleteScenario = (id) => {
    const confirmDelete = window.confirm("Удалить этот сценарий?");
    if (!confirmDelete) return;

    const updated = customScenarios.filter((sc) => sc.id !== id);
    setCustomScenarios(updated);
    localStorage.setItem("customScenarios", JSON.stringify(updated));
  };

  const selectScenario = (scenario) => {
    setSelectedRoles(scenario.roles);
    navigate("/scenario");
  };

  const createCustomScenario = () => {
    setSelectedRoles([]);
    navigate("/scenario");
  };

  return (
    <div className="p-6 space-y-6">
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
              <>
                <div
                  key={scenario.id}
                  className="text-white rounded-xl transition flex"
                >
                  <div
                    className="w-80 p-2 bg-gray-800 "
                    onClick={() => handleScenarioClick(scenario.id)}
                  >
                    <h3 className="text-xl font-semibold">{scenario.name}</h3>
                  </div>

                  {/* Кнопка удаления */}
                  <button
                    onClick={(e) => {
                      // e.stopPropagation(); // чтобы не срабатывал выбор сценария
                      deleteScenario(scenario.id);
                    }}
                    className="p-2 right-2 text-gray-300 bg-red-800  transition w-20"
                    title="Удалить сценарий"
                  >
                    🗑
                  </button>
                </div>
                {/* Если этот сценарий выбран — показываем кнопки */}
                {selectedScenarioId === scenario.id && (
                  <div className=" flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // чтобы не срабатывал повторный выбор
                        debugger;
                        openScenario(scenario);
                      }}
                      className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
                    >
                      Посмотреть роли
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex-1 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition"
                    >
                      Выбрать
                    </button>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}

      <div
        onClick={createCustomScenario}
        className="p-4 bg-indigo-800 text-white rounded-xl cursor-pointer hover:bg-indigo-700 transition"
      >
        <h2 className="text-xl font-semibold">Создать свой сценарий</h2>
      </div>
    </div>
  );
}
