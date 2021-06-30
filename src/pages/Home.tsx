import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { database } from "../services/firebase";

import illustrationSvg from "../assets/images/illustration.svg";
import logoSvg from "../assets/images/logo.svg";
import googleIconSvg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateroom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();
    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Sala não existe 😕");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Sala já foi encerrada.");
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationSvg} alt='Ilustração de perguntas e respostas' />
        <div className='aside-text'>
          <strong>Crie salas de Q&amp;A ao vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </div>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoSvg} alt='ask_me' />
          <button className='create-room' onClick={handleCreateroom}>
            <img src={googleIconSvg} alt='Google Logo' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
