import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";

type FormData = {
  name: string;
  login: string;
  password: string;
  url: string;
  id?: number;
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [list, setList] = useState<FormData[]>([]);
  const [showPasswords, setShowPasswords] = useState(false);

  const toggleShowPasswords = () => {
    setShowPasswords((prevState) => !prevState);
  };

  const addItems = (item: FormData) => {
    setList([...list, item]);
    setShowForm(false);
    setShowButton(true);
    console.log(list);
  };

  const clickShowHandler = () => {
    setShowForm(true);
    setShowButton(false);
  };

  const clickHideHandler = () => {
    setShowForm(false);
    setShowButton(true);
  };

  const deleteItem = (id: number | undefined) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <>
      <Header />
      {showButton && (
        <div>
          <label htmlFor="showPassword">Esconder senhas</label>
          <input
            id="showPassword"
            type="checkbox"
            checked={showPasswords}
            onChange={toggleShowPasswords}
          />
          <button onClick={clickShowHandler}>Cadastrar nova senha</button>
        </div>
      )}
      <button onClick={clickHideHandler}>Cancelar</button>
      {showForm && <Form addItems={addItems} />}
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.id}>
            <a href={item.url}>{item.name}</a>
            <p>{item.login}</p>
            {!showPasswords ? (
              <p>{item.password}</p>
            ) : (
              <p>{"*".repeat(item.password.length)}</p>
            )}
            <button
              data-testid="remove-btn"
              onClick={() => deleteItem(item.id)}
            >
              Apagar
            </button>
          </div>
        ))
      ) : (
        <p>Nenhuma senha cadastrada</p>
      )}
      {/* {list.length > 0 ? (
        list.map((item) => {
          <div key={item.id}>
            <a href={list.url}>{list.name}</a>
            <p>{list.login}</p>
            {showPasswords ? (
              <p>{item.password}</p>
            ) : (
              <p>{"*".repeat(item.password.length)}</p>
            )}
            <button
              data-testid="remove-btn"
              onClick={() => deleteItem(list.id)}
            >
              Apagar
            </button>
          </div>;
        })
      ) : (
        <p>Nenhuma senha cadastrada</p>
      )} */}
    </>
  );
}

export default App;
