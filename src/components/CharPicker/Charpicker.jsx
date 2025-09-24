import React, { useState } from "react";
import "./CharacterPicker.css";

// characters: массив объектов { id, name, imageSrc }
// onSelectionChange: функция, которая получает массив выбранных персонажей
export default function CharacterPicker({ characters, onSelectionChange }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (character) => {
    let updated;
    if (selectedIds.includes(character.id)) {
      updated = selectedIds.filter((id) => id !== character.id);
    } else {
      updated = [...selectedIds, character.id];
    }
    setSelectedIds(updated);
    if (onSelectionChange) onSelectionChange(updated);
  };

  return (
    <div className="character-grid">
      {characters.map((char) => (
        <div
          key={char.id}
          className={`character-item ${
            selectedIds.includes(char.id) ? "selected" : ""
          }`}
          onClick={() => toggleSelect(char)}
        >
          <div className="character-circle">
            <img src={char.imageSrc} alt={char.name} />
          </div>
          <div className="character-name">{char.name}</div>
        </div>
      ))}
    </div>
  );
}
