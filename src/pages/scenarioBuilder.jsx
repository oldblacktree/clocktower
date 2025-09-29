import { useState } from "react";
import washerwomanImg from "../assets/washerwoman.png";

// Заглушка ролей — укажи свои картинки в папке /src/assets
const allRoles = [
  {
    id: "washerwoman",
    name: "Washerwoman",
    type: "townsfolk",
    img: "../public/washerwoman.png",
  },
  {
    id: "imp",
    name: "Imp",
    type: "demon",
    img: "../../public/washerwoman.png",
  },
  {
    id: "poisoner",
    name: "Poisoner",
    type: "minion",
    img: "../../public/washerwoman.png",
  },
  {
    id: "fortune_teller",
    name: "Fortune Teller",
    type: "townsfolk",
    img: "../../public/washerwoman.png",
  },
];

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
        <div className="grid grid-cols-4 gap-4">
          {allRoles.map((role) => {
            const isSelected = selectedRoles.some((r) => r.id === role.id);
            return (
              <div
                key={role.id}
                onClick={() => toggleRole(role)}
                className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition 
                  ${isSelected ? "border-blue-500" : "border-transparent"}`}
              >
                <img
                  src={washerwomanImg}
                  alt={role.name}
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
                src={role.img}
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
