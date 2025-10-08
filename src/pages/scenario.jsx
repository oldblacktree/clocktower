import { useState } from "react";
import { roles as rolesAll } from "../data/roles";
import { roleLayouts as roleLayoutsAll } from "../data/roles";

let roleLayouts;

export default function ScenarioBuilder({
  selectedRoles,
  setSelectedRoles,
  showSelectedOnly,
  setShowSelectedOnly,
  hiddenPlayerCount,
  hidePlayerCount,
  playerCount,
  setPlayerCount,
  playersRoles,
  setPlayersRoles,
}) {
  // если включен режим "только выбранные", то фильтруем массив

  const increasePlayers = () =>
    setPlayerCount((prev) => Math.min(prev + 1, 15));
  const decreasePlayers = () => setPlayerCount((prev) => Math.max(prev - 1, 5));

  const toggleRoleScenario = (role) => {
    if (selectedRoles.find((r) => r.id === role.id)) {
      // если выбрана → убираем
      setSelectedRoles(selectedRoles.filter((r) => r.id !== role.id));
    } else {
      // если нет → добавляем
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const togglePlayersRoles = (role) => {
    if (playersRoles.find((r) => r.id === role.id)) {
      // если выбрана → убираем
      setPlayersRoles(playersRoles.filter((r) => r.id !== role.id));
    } else {
      // если нет → добавляем
      setPlayersRoles([...playersRoles, role]);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Выбор количества игроков*/}
      {showSelectedOnly && (
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
            <div className="p-2 flex items-center justify-between">
              <span className="text-base font-semibold transition w-30">
                Раскладка на {playerCount} игроков:
              </span>
              <span className="text-lg font-semibold transition text-indigo-300 w-30">
                {" "}
                {roleLayoutsAll[playerCount].demons}/
                {roleLayoutsAll[playerCount].minions}/
                {roleLayoutsAll[playerCount].outsiders}/
                {roleLayoutsAll[playerCount].townsfolks}
              </span>
              <button
                onClick={() => {
                  hidePlayerCount(!hiddenPlayerCount);
                }}
                className="w-30 py-2 text-lg font-semibold transition bg-gray-800 text-indigo-300 border border-yellow-500"
              >
                Изменить
              </button>
            </div>
          )}
        </div>
      )}

      {/* Кнопки как выбирать роли */}
      {showSelectedOnly && (
        <div className="flex justify-between">
          <p>Выбор ролей в игре:</p>

          <button className="w-40 py-2 text-lg font-semibold transition bg-gray-800 text-indigo-300 border border-yellow-500">
            Выбрать рандомно
          </button>
        </div>
      )}

      {/* Все роли */}
      {!showSelectedOnly && (
        <div>
          <h4 className={`text-yellow-500  text-lg`}>Горожане</h4>
          <div className="grid grid-cols-4 gap-4 py-2">
            {rolesAll
              .filter((item) => item.type === "townsfolk")
              .map((role) => {
                const isSelected = selectedRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRoleScenario(role)}
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
          <div className="grid grid-cols-4 gap-4 py-2">
            {rolesAll
              .filter((item) => item.type === "outsider")
              .map((role) => {
                const isSelected = selectedRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRoleScenario(role)}
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
          <div className="grid grid-cols-4 gap-4 py-2">
            {rolesAll
              .filter((item) => item.type === "minion")
              .map((role) => {
                const isSelected = selectedRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRoleScenario(role)}
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
          <div className="grid grid-cols-4 gap-4 py-2">
            {rolesAll
              .filter((item) => item.type === "demon")
              .map((role) => {
                const isSelected = selectedRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRoleScenario(role)}
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
      )}

      {/* выбранные роли для сценария */}
      {showSelectedOnly && (
        <div>
          <h4 className={`text-yellow-500  text-lg`}>Горожане</h4>
          <div className="grid grid-cols-4 gap-4 py-2">
            {selectedRoles
              .filter((item) => item.type === "townsfolk")
              .map((role) => {
                const isSelected = playersRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => togglePlayersRoles(role)}
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
            {selectedRoles
              .filter((item) => item.type === "outsider")
              .map((role) => {
                const isSelected = playersRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => togglePlayersRoles(role)}
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
          <h4 className={`text-yellow-500  text-lg`}>Приспешники</h4>
          <div className="grid grid-cols-4 gap-4 py-2">
            {selectedRoles
              .filter((item) => item.type === "minion")
              .map((role) => {
                const isSelected = playersRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => togglePlayersRoles(role)}
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
          <h4 className={`text-yellow-500  text-lg`}>Демоны</h4>
          <div className="grid grid-cols-4 gap-4 py-2">
            {selectedRoles
              .filter((item) => item.type === "demon")
              .map((role) => {
                const isSelected = playersRoles.some((r) => r.id === role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => togglePlayersRoles(role)}
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
        </div>
      )}

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
