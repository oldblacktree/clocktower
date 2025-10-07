import { useState } from "react";
import { roleLayouts as roleLayoutsAll } from "../data/roles";

let roleLayouts;

export default function Setup({
  selectedRoles,
  playerCount,
  setPlayerCount,
  hiddenPlayerCount,
  hidePlayerCount,
}) {
  const increasePlayers = () =>
    setPlayerCount((prev) => Math.min(prev + 1, 15));
  const decreasePlayers = () => setPlayerCount((prev) => Math.max(prev - 1, 5));

  return (
    <>
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
    </>
  );
}

//выбирает рандомныt items из массива
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
