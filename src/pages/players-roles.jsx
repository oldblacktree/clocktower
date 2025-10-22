import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayersRoles({
  playerCount,
  playersRoles,
  setPlayersRoles,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showRolePicker, setShowRolePicker] = useState(false);

  const navigate = useNavigate();

  // роли, которые еще никому не назначены
  const availableRoles = playersRoles.filter((r) => !r.playerNumber);

  const getRoleForPlayer = (num) =>
    playersRoles.find((r) => r.playerNumber === num);

  const openRolePicker = (index) => {
    setSelectedPlayer(index + 1);
    setShowRolePicker(true);
  };

  const handleSelectRole = (newRole) => {
    setPlayersRoles((prev) =>
      prev.map((r) => {
        // 1️⃣ Снимаем роль с игрока, если у роли был этот игрок
        if (r.playerNumber === selectedPlayer) {
          return { ...r, playerNumber: null };
        }

        // 2️⃣ Назначаем выбранную роль игроку
        if (r.id === newRole.id) {
          return { ...r, playerNumber: selectedPlayer };
        }

        return r;
      })
    );

    setShowRolePicker(false);
  };

  const resetAssignments = () =>
    setPlayersRoles((prev) => prev.map((r) => ({ ...r, playerNumber: null })));

  // размеры овала (адаптированы под экран телефона 1080x2400)
  const radiusX = 330;
  const radiusY = 150;

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
      <h1 className="text-xl font-bold mb-4">Игроки тянут роли</h1>

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
              className={`absolute w-20 h-20 rounded-full border-2 cursor-pointer flex items-center justify-center transition bg-[#23343b]
                ${
                  role
                    ? "border-green-200 bg-[#23343b]"
                    : "border-gray-700 bg-[#23343b]"
                }`}
              style={{
                left: `calc(50% + ${pos.x}px - 2.5rem)`,
                top: `calc(50% + ${pos.y}px - 2rem)`,
              }}
            >
              {role && (
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  alt={role.name}
                  className="w-full h-full rounded-full object-cover"
                />
              )}
              <span className="absolute -bottom-6 inset-x-0 text-lg">
                {playerNum}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between p-4 w-100">
        <button
          onClick={resetAssignments}
          className="px-4 py-2 bg-[#23343b] text-white rounded-lg border-2 border-red-200"
        >
          cбросить роли
        </button>
        <button
          disabled={availableRoles.length !== 0}
          onClick={() => navigate("/table")}
          className={`px-4 py-2 bg-[#23343b] text-white rounded-lg border-2 border-green-200     ${
            availableRoles.length !== 0
              ? "bg-gray-500 cursor-not-allowed opacity-60"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          роли выбраны
        </button>
      </div>

      {/* Модалка выбора роли */}
      {showRolePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-xl max-w-sm w-full text-center relative">
            <div className="text-lg font-semibold text-white mb-3 relative">
              <span>Выберите роль игроку {selectedPlayer}</span>
            </div>

            {availableRoles.length === 0 ? (
              <p className="text-gray-400 mb-3">Все роли уже назначены</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {availableRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent bg-[#23343b]"
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
              className="px-4 py-2 bg-red-700 text-white rounded-lg absolute top-0 right-0"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
