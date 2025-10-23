import { useState } from "react";
import { roleLayouts as roleLayoutsAll } from "../data/roles";
import { useNavigate } from "react-router-dom";

let roleLayouts;

export default function RolePicking({
  playerCount,
  setPlayerCount,
  scenarioRoles,
  playersRoles,
  setPlayersRoles,
}) {
  const [hiddenPlayerCount, hidePlayerCount] = useState(false);

  const navigate = useNavigate();

  const increasePlayers = () =>
    setPlayerCount((prev) => Math.min(prev + 1, 15));
  const decreasePlayers = () => setPlayerCount((prev) => Math.max(prev - 1, 5));

  const togglePlayersRole = (role) => {
    if (playersRoles.find((r) => r.id === role.id)) {
      // если выбрана → убираем
      setPlayersRoles(playersRoles.filter((r) => r.id !== role.id));
    } else {
      // если нет → добавляем
      setPlayersRoles([...playersRoles, role]);
    }
  };

  const handleStartGameClick = () => {
    navigate("/players-roles");
  };

  // 🔹 функция для случайного выбора ролей
  const handleRandomGenerate = () => {
    if (!hiddenPlayerCount) return;

    const layout = roleLayoutsAll[playerCount];
    if (!layout) return;

    const demons = getRandomItems(
      scenarioRoles.filter((r) => r.type === "demon"),
      layout.demons
    );
    const minions = getRandomItems(
      scenarioRoles.filter((r) => r.type === "minion"),
      layout.minions
    );
    const outsiders = getRandomItems(
      scenarioRoles.filter((r) => r.type === "outsider"),
      layout.outsiders
    );
    const townsfolks = getRandomItems(
      scenarioRoles.filter((r) => r.type === "townsfolk"),
      layout.townsfolks
    );

    const newRoles = [...demons, ...minions, ...outsiders, ...townsfolks];
    setPlayersRoles(newRoles);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {/* Выбор количества игроков*/}
      <div>
        {!hiddenPlayerCount && (
          <div className="p-4 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-2xl font-bold">Количество игроков :</h1>

            <div className="flex items-center space-x-4">
              <button
                onClick={decreasePlayers}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-2xl font-bold hover:bg-gray-600 transition"
              >
                −
              </button>

              <span className="text-3xl font-semibold w-16 text-center">
                {playerCount}
              </span>

              <button
                onClick={increasePlayers}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-2xl font-bold hover:bg-gray-600 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                hidePlayerCount(!hiddenPlayerCount);
                roleLayouts = roleLayoutsAll[playerCount];
              }}
              className="w-full py-2 text-lg font-semibold transition bg-gray-800 text-indigo-300 border border-yellow-500"
            >
              Выбрать
            </button>
          </div>
        )}
        {hiddenPlayerCount && (
          <div className="p-2 flex items-center justify-between w-full">
            <span className="text-base font-semibold transition w-30">
              {playerCount} игроков:
            </span>
            <span className="text-xl font-semibold transition text-indigo-300 w-30">
              {roleLayoutsAll[playerCount].demons}/
              {roleLayoutsAll[playerCount].minions}/
              {roleLayoutsAll[playerCount].outsiders}/
              {roleLayoutsAll[playerCount].townsfolks}
            </span>
            <button
              onClick={() => {
                hidePlayerCount(!hiddenPlayerCount);
              }}
              className="w-30 text-lg font-semibold transition bg-gray-800 text-indigo-300 border border-yellow-500"
            >
              Изменить
            </button>
          </div>
        )}
      </div>

      {/* 🔹 кнопка случайной генерации */}
      {hiddenPlayerCount && (
        <button
          onClick={handleRandomGenerate}
          className="my-4 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 active:scale-95 transition"
        >
          🎲 Сгенерировать случайно
        </button>
      )}

      {/* Все роли */}
      <h1 className="text-2xl font-bold text-yellow-400 mb-4 my-4">
        Выбери роли которые будут в игре
      </h1>

      <div>
        {["townsfolk", "outsider", "minion", "demon"].map((type) => (
          <div key={type}>
            <h4 className="text-yellow-500 text-lg">
              {
                {
                  townsfolk: "Горожане",
                  outsider: "Изгои",
                  minion: "Приспешники",
                  demon: "Демоны",
                }[type]
              }
            </h4>
            <div className="grid grid-cols-4 gap-4 py-2">
              {scenarioRoles
                .filter((item) => item.type === type)
                .map((role) => {
                  const isSelected = playersRoles.some((r) => r.id === role.id);
                  return (
                    <div
                      key={role.id}
                      onClick={() => togglePlayersRole(role)}
                      className={`w-20 h-20 rounded-full overflow-hidden border-4 transition cursor-pointer
                        ${
                          isSelected
                            ? "border-purple-500"
                            : "border-transparent"
                        }
                        ${
                          type === "townsfolk"
                            ? "bg-[#23343b]"
                            : type === "outsider"
                            ? "bg-[#192429]"
                            : type === "minion"
                            ? "bg-[#312a2b]"
                            : "bg-[#2f1c1f]"
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
        ))}
      </div>

      <button
        disabled={playersRoles.length !== playerCount}
        onClick={handleStartGameClick}
        className={`p-4 text-white w-90 rounded-xl transition
          ${
            playersRoles.length !== playerCount
              ? "bg-gray-500 cursor-not-allowed opacity-60"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
      >
        <h2 className="text-xl font-semibold">Начать игру</h2>
      </button>
    </div>
  );
}

// 🔹 вспомогательная функция для случайного выбора элементов
function getRandomItems(arr, count = 1) {
  if (!arr || arr.length === 0 || count <= 0) return [];
  const copy = [...arr];
  const result = [];

  for (let i = 0; i < count && copy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }

  return result;
}
