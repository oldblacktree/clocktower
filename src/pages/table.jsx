import { useState, useMemo } from "react";

export default function Table({ playerCount, playersRoles, setPlayersRoles }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showRolePicker, setShowRolePicker] = useState(false);

  // координаты по овалу
  const radiusX = 160;
  const radiusY = 250;
  const circlePositions = Array.from({ length: playerCount }).map((_, i) => {
    const angle = (2 * Math.PI * i) / playerCount - Math.PI / 2;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    return { x, y };
  });

  // роли, которые еще никому не назначены
  const availableRoles = useMemo(
    () => playersRoles.filter((r) => !r.playerNumber),
    [playersRoles]
  );

  // находим роль, назначенную конкретному игроку
  const getRoleForPlayer = (num) =>
    playersRoles.find((r) => r.playerNumber === num);

  // при клике на игрока
  const openRolePicker = (index) => {
    setSelectedPlayer(index + 1);
    setShowRolePicker(true);
  };

  // при выборе роли
  const handleSelectRole = (role) => {
    setPlayersRoles((prev) =>
      prev.map((r) =>
        r.id === role.id ? { ...r, playerNumber: selectedPlayer } : r
      )
    );
    setShowRolePicker(false);
  };

  // сбросить распределение ролей
  const resetAssignments = () =>
    setPlayersRoles((prev) => prev.map((r) => ({ ...r, playerNumber: null })));

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <h1 className="text-xl font-bold mb-4">Рассадка игроков</h1>

      {/* Игровой овал */}
      <div className="relative w-[320px] h-[300px] flex items-center justify-center">
        {/* Центральный ведущий */}
        <div className="absolute w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
          🎭
        </div>

        {/* Игроки */}
        {circlePositions.map((pos, i) => {
          const playerNum = i + 1;
          const role = getRoleForPlayer(playerNum);

          return (
            <div
              key={playerNum}
              onClick={() => openRolePicker(i)}
              className={`absolute w-16 h-16 rounded-full border-4 cursor-pointer flex items-center justify-center transition
                ${
                  role
                    ? "border-green-400 bg-gray-800"
                    : "border-gray-600 bg-gray-700 hover:border-yellow-400"
                }`}
              style={{
                left: `calc(50% + ${pos.x}px - 2rem)`,
                top: `calc(50% + ${pos.y}px - 2rem)`,
              }}
            >
              {role ? (
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  alt={role.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-xs text-center leading-tight">
                  Игрок {playerNum}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Кнопка сброса */}
      <button
        onClick={resetAssignments}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Сбросить роли
      </button>

      {/* Модалка выбора роли */}
      {showRolePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-white mb-3">
              Выберите роль игроку {selectedPlayer}
            </h2>

            {availableRoles.length === 0 ? (
              <p className="text-gray-400 mb-3">Все роли уже назначены</p>
            ) : (
              <div className="grid grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
                {availableRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent hover:border-yellow-400 transition cursor-pointer bg-[#23343b]"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}/assets/roles/${
                        role.id
                      }.png`}
                      alt={role.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowRolePicker(false)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
