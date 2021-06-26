import illustrationSvg from "../assets/images/illustration.svg"
import logoSvg from "../assets/images/logo.svg"
import googleIconSvg from "../assets/images/google-icon.svg"

import "../styles/auth.scss"

export function Home() {
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
          <button className="create-room">
            <img src={googleIconSvg} alt="Google Logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  )
}
