import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import CharacterPicker from "./components/CharPicker/Charpicker";

const characters = [
  {
    id: 1,
    name: "Washerwoman",
    nameRu: "Прачка",
    imageSrc: "/assets/Washerwoman.png",
    role: "citizen",
  },
  {
    id: 2,
    name: "Monk",
    nameRu: "Монах",
    imageSrc: "/assets/Monk.png",
    role: "citizen",
  },
];

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleSelectionChange = (selectedIds) => {
    setSelectedCharacters(selectedIds);
  };

  return (
    <>
      <h1>Blood on the Clocktower</h1>
      <Timer />
      <div>
        <h1>Выберите персонажей для игры</h1>
        <CharacterPicker
          characters={characters}
          onSelectionChange={handleSelectionChange}
        />
        <div style={{ marginTop: "20px" }}>
          <h2>Выбранные персонажи ({selectedCharacters.length}):</h2>
          <ul>
            {selectedCharacters.map((id) => {
              const char = characters.find((c) => c.id === id);
              return <li key={id}>{char.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
