import { useState, useMemo, useEffect } from "react";

export default function Table({ playerCount, playersRoles, setPlayersRoles }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showRolePicker, setShowRolePicker] = useState(false);

  // роли, которые еще никому не назначены
  const availableRoles = useMemo(
    () => playersRoles.filter((r) => !r.playerNumber),
    [playersRoles]
  );

  const getRoleForPlayer = (num) =>
    playersRoles.find((r) => r.playerNumber === num);

  const openRolePicker = (index) => {
    setSelectedPlayer(index + 1);
    setShowRolePicker(true);
  };

  const handleSelectRole = (role) => {
    setPlayersRoles((prev) =>
      prev.map((r) =>
        r.id === role.id ? { ...r, playerNumber: selectedPlayer } : r
      )
    );
    setShowRolePicker(false);
  };

  const resetAssignments = () =>
    setPlayersRoles((prev) => prev.map((r) => ({ ...r, playerNumber: null })));

  // размеры овала (адаптированы под экран телефона 1080x2400)
  const radiusX = 330; // ширина (чуть меньше половины экрана)
  const radiusY = 150; // высота (вытянут вверх)

  // === РАВНОМЕРНОЕ распределение точек по длине эллипса ===
  const generateEvenlySpacedPoints = (n) => {
    const steps = 500; // дискретизация для приближения длины
    const angles = Array.from(
      { length: steps + 1 },
      (_, i) => (i * 2 * Math.PI) / steps
    );

    // длина малых дуг
    const ds = [];
    let totalLength = 0;
    for (let i = 0; i < steps; i++) {
      const t1 = angles[i];
      const t2 = angles[i + 1];
      const dx = radiusX * (Math.cos(t2) - Math.cos(t1));
      const dy = radiusY * (Math.sin(t2) - Math.sin(t1));
      const d = Math.sqrt(dx * dx + dy * dy);
      ds.push(d);
      totalLength += d;
    }

    // равномерное распределение точек по длине
    const segmentLength = totalLength / n;
    const points = [];
    let currentLength = 0;
    let target = segmentLength / 2; // чтобы 1-й игрок был снизу

    for (let i = 0; i < steps; i++) {
      currentLength += ds[i];
      if (currentLength >= target) {
        const angle = angles[i];
        points.push({
          x: radiusX * Math.cos(angle),
          y: radiusY * Math.sin(angle),
        });
        target += segmentLength;
      }
    }

    return points;
  };

  const circlePositions = useMemo(
    () => generateEvenlySpacedPoints(playerCount),
    [playerCount]
  );

  // вращаем, чтобы первый игрок был снизу
  const rotatedPositions = circlePositions.map((pos) => ({
    x: pos.x * Math.cos(Math.PI / 2) - pos.y * Math.sin(Math.PI / 2),
    y: pos.x * Math.sin(Math.PI / 2) + pos.y * Math.cos(Math.PI / 2),
  }));

  return (
    <div className="flex flex-col items-center justify-center h-full relative p-4">
      <h1 className="text-xl font-bold mb-4">Рассадка игроков</h1>

      {/* Игровой овал */}
      <div className="relative w-[360px] h-[770px] flex items-center justify-center">
        {/* Игроки */}
        {rotatedPositions.map((pos, i) => {
          const playerNum = i + 1;
          const role = getRoleForPlayer(playerNum);

          return (
            <div
              key={playerNum}
              onClick={() => openRolePicker(i)}
              className={`absolute w-20 h-20 rounded-full border-4 cursor-pointer flex items-center justify-center transition
                ${
                  role
                    ? "border-green-400 bg-gray-800"
                    : "border-gray-600 bg-gray-700 hover:border-yellow-400"
                }`}
              style={{
                left: `calc(50% + ${pos.x}px - 2.5rem)`,
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
                    className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent hover:border-yellow-400 transition cursor-pointer bg-[#23343b]"
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
