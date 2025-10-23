import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Table({ playerCount, playersRoles, setPlayersRoles }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const navigate = useNavigate();

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

  const getRoleForPlayer = (num) =>
    playersRoles.find((r) => r.playerNumber === num);
  // вращаем, чтобы первый игрок был снизу
  const rotatedPositions = circlePositions.map((pos) => ({
    x: pos.x * Math.cos(Math.PI / 2) - pos.y * Math.sin(Math.PI / 2),
    y: pos.x * Math.sin(Math.PI / 2) + pos.y * Math.cos(Math.PI / 2),
  }));

  return (
    <div className="flex flex-col items-center justify-center h-full relative p-4">
      {/* Игровой овал */}
      <div className="relative w-[360px] h-[770px] flex items-center justify-center">
        {/* Игроки */}
        {rotatedPositions.map((pos, i) => {
          const playerNum = i + 1;
          const role = getRoleForPlayer(playerNum);

          return (
            <div
              key={playerNum}
              onClick={() => setShowStatusPicker(i)}
              className={`absolute w-20 h-20 rounded-full border-2 cursor-pointer flex items-center justify-center transition bg-[#23343b] border-green-200`}
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

      {/* Модалка выбора роли */}
      {showStatusPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-xl max-w-sm w-full text-center relative">
            <div className="text-lg font-semibold text-white mb-3 relative">
              <span>Добавить статус игроку {selectedPlayer}</span>
            </div>

            {/* {availableRoles.length === 0 ? (
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
            )} */}

            <button
              onClick={() => setShowStatusPicker(false)}
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
