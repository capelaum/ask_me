import { useState } from "react";
import copySvg from "../../assets/images/copy.svg";

import "./styles.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const [infoText, setInfoText] = useState("");

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    setInfoText("Código copiado");
  }

  function handleMouseLeave() {
    if (infoText === "Código copiado") {
      setTimeout(() => {
        setInfoText("");
      }, 3000);
    } else {
      setInfoText("");
    }
  }

  return (
    <div className='room-code-container'>
      <button
        className='room-code'
        onClick={copyRoomCodeToClipboard}
        onMouseEnter={() => setInfoText("Copiar código")}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <img src={copySvg} alt='Copiar códido da sala' />
        </div>
        <span>{code}</span>
      </button>

      <span
        className={`info-text ${infoText === "Código copiado" ? "green" : ""} `}
      >
        {infoText}
      </span>
    </div>
  );
}
