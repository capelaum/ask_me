import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import illustrationSvg from "../assets/images/illustration.svg";
import logoSvg from "../assets/images/logo.svg";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form action=''>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>{" "}
          </p>
        </div>
      </main>
    </div>
  );
}
