import { useState } from "react";
import { roles as rolesAll } from "../data/roles";

export default function ScenarioBuilder() {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRole = (role) => {
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
      <h1 className="text-xl font-bold">Конструктор сценария</h1>

      {/* Все роли */}
      <div>
        <h2 className="font-semibold mb-2">Все роли</h2>
        <h4>Горожане</h4>
        <div className="grid grid-cols-4 gap-4">
          {rolesAll
            .filter((item) => item.type === "townsfolk")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition 
                  ${isSelected ? "border-blue-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              );
            })}
        </div>
        <h4>Изгои</h4>
        <div className="grid grid-cols-4 gap-4">
          {rolesAll
            .filter((item) => item.type === "outsider")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition 
                  ${isSelected ? "border-blue-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              );
            })}
        </div>
        <h4>Приспешники</h4>
        <div className="grid grid-cols-4 gap-4">
          {rolesAll
            .filter((item) => item.type === "minion")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition 
                  ${isSelected ? "border-blue-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              );
            })}
        </div>
        <h4>Демоны</h4>
        <div className="grid grid-cols-4 gap-4">
          {rolesAll
            .filter((item) => item.type === "demon")
            .map((role) => {
              const isSelected = selectedRoles.some((r) => r.id === role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role)}
                  className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition 
                  ${isSelected ? "border-blue-500" : "border-transparent"}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/roles/${
                      role.id
                    }.png`}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* Выбранные роли */}
      <div>
        <h2 className="font-semibold mb-2">Выбранные роли</h2>
        {selectedRoles.length === 0 && (
          <p className="text-gray-500">Нет выбранных ролей</p>
        )}
        <ul className="flex flex-wrap gap-2">
          {selectedRoles.map((role) => (
            <li key={role.id} className="flex items-center space-x-1">
              <img
                src={`${import.meta.env.BASE_URL}/assets/roles/${role.id}.png`}
                alt={role.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{role.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
