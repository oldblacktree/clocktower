import { useState } from "react";
import { roles as rolesAll } from "../data/roles";

export default function ScenarioBuilder({ selectedRoles, setSelectedRoles }) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // если включен режим "только выбранные", то фильтруем массив
  const rolesToShow = showSelectedOnly ? selectedRoles : rolesAll;

  const toggleRole = (role) => {
    if (showSelectedOnly) {
      return;
    }

    if (selectedRoles.find((r) => r.id === role.id)) {
      // если выбрана → убираем
      setSelectedRoles(selectedRoles.filter((r) => r.id !== role.id));
    } else {
      // если нет → добавляем
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Все роли */}
      <div>
        <h4 className={`text-yellow-500  text-lg`}>Горожане</h4>
        <div className="grid grid-cols-4 gap-4 py-2">
          {rolesToShow
            .filter((item) => item.type === "townsfolk")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b]
                  ${
                    isSelected && !showSelectedOnly
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
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
        <div className="grid grid-cols-4 gap-4">
          {rolesToShow
            .filter((item) => item.type === "outsider")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#192429]
                  ${
                    isSelected && !showSelectedOnly
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
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
        <div className="grid grid-cols-4 gap-4">
          {rolesToShow
            .filter((item) => item.type === "minion")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#312a2b]
                  ${
                    isSelected && !showSelectedOnly
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
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
        <div className="grid grid-cols-4 gap-4">
          {rolesToShow
            .filter((item) => item.type === "demon")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#2f1c1f]
                  ${
                    isSelected && !showSelectedOnly
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
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
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 ">
        <button
          onClick={() => setShowSelectedOnly(!showSelectedOnly)}
          className="w-full py-2 text-lg font-semibold transition bg-gray-800 text-indigo-300 border border-yellow-500"
        >
          {showSelectedOnly
            ? "Вернуться к выбору ролей"
            : "Показать выбранные роли"}
        </button>
      </div>
    </div>
  );
}
