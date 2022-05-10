import "./HeaderContainer.css";
import { ActionMode } from "../../constants/index";

function HeaderContainer({ createPublicacao, updatePublicacao, mode }) {
  return (
    <div className="Header">
      <div className="LogoTitulo">
        <img
          src={require("../../assets/images/logo-friendszone.jpg")}
          alt="Logo FriendsZone"
          className="Logo"
        />
        <h1>FriendsZone</h1>
      </div>

      <button
        type="button"
        className={`Opcoes__publicacao Publicacao ${
          mode === ActionMode.ATUALIZAR && "Publicacao--ativa"
        }`}
        onClick={() => updatePublicacao()}
      >
        <img
          src={require("../../assets/images/perfil-image.png")}
          width="40px"
          className="Publicacao__icone"
          alt="Editar publicacao"
        />
      </button>

      <button
        type="button"
        className="Opcoes__publicacao Publicacao"
        onClick={() => createPublicacao()}
      >
        <img
          src={require("../../assets/images/perfil-image.png")}
          width="40px"
          className="Publicacao__icone"
          alt="Adiconar Publicacao"
        />
      </button>

      <div className="Pesquisar">
        <input
          type="text"
          placeholder="Digite o nome de um usuário"
          className="Input"
        />

        <img
          src={require("../../assets/images/lupa-icon.png")}
          alt="Ícone de lupa"
          className="LupaIcon"
        />
      </div>
    </div>
  );
}

export default HeaderContainer;
