import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import CharacterPicker from "./components/CharPicker/Charpicker";

const characters = [
  { id: 1, name: "Washerwoman", imageSrc: "/assets/Washerwoman.png" },
  { id: 2, name: "Mage", imageSrc: "/images/mage.png" },
  { id: 3, name: "Archer", imageSrc: "/images/archer.png" },
  // ...можно добавить до 100+ персонажей
];

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleSelectionChange = (selectedIds) => {
    setSelectedCharacters(selectedIds);
  };

  return (
    <>
      <h1>Blood on the Clocktower</h1>
      <img src="./assets/Washerwoman.png" alt="" />
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
