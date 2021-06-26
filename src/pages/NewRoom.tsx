import { Link } from "react-router-dom"
import illustrationSvg from "../assets/images/illustration.svg"
import logoSvg from "../assets/images/logo.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationSvg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoSvg} alt="ask_me" />
          <h2>Criar uma nova sala</h2>

          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>{" "}
          </p>
        </div>
      </main>
    </div>
  )
}
