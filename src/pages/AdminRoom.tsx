import { useHistory, useParams } from "react-router-dom";

import logoSvg from "../assets/images/logo.svg";
import deleteSvg from "../assets/images/delete.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja remover esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoSvg} alt='ask_me' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
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
            <Question key={id} content={content} author={author}>
              <button type='button' onClick={() => handleDeleteQuestion(id)}>
                <img src={deleteSvg} alt='remover pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
