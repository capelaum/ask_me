import { useParams } from "react-router-dom";

import logoSvg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import "./Room/styles.scss";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const { questions, title } = useRoom(roomId);

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoSvg} alt='ask_me' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar a sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map(({ id, content, author }) => (
            <Question key={id} content={content} author={author} />
          ))}
        </div>
      </main>
    </div>
  );
}
