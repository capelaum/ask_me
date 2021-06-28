import { MouseEvent, useState } from "react";
import copySvg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const [infoText, setInfoText] = useState("");

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    setInfoText("Código copiado");
  }

  function showInfoText() {
    setInfoText("Copiar código");
  }

  function hideInfoText() {
    setInfoText("");
  }

  return (
    <div className='room-code-container'>
      <button
        className='room-code'
        onClick={copyRoomCodeToClipboard}
        onMouseEnter={showInfoText}
        onMouseLeave={hideInfoText}
      >
        <div>
          <img src={copySvg} alt='Copiar códido da sala' />
        </div>
        <span>{code}</span>
      </button>

      {infoText === "Copiar código" ? (
        <span className='info-text'>{infoText}</span>
      ) : (
        <span className='info-text green'>{infoText}</span>
      )}
    </div>
  );
}
