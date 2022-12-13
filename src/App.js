import logo from './logo.svg';
import { useState} from 'react';
import './App.css';
import styled from "styled-components"

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [newTarefa, setNewTarefa] = useState("")

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTarefa || tarefas.includes(newTarefa)) return;

    setTarefas([...tarefas, newTarefa]);
    setNewTarefa("");
  }

  function handleDelete(taf) {
    setTarefas(tarefas.filter((tafItem) => tafItem !== taf));
  }


  return (
    <div className="App">
      <header className="App-header">
        <Text>
          Lista de tarefas a serem relizadas no dia 12/12/2022
        </Text>
       <ul data-testid="ul-tarefas">
      {tarefas.length !== 0 ?
      <>
      {tarefas.map((taf) => (
        <li data-testid={taf} key={taf}>
        {taf}
        <Button
        data-testid={`${taf}-btn-delete`}
        type="button"
        onClick={() =>  handleDelete(taf)}
        >
        ❌
        </Button>
        </li>
      ))}
      </> : 
      <>
      <p>
        Ainda não há tarefas para o dia
      </p>
       </>}
       </ul>
       <Form data-testid="form-add-tarefa" onSubmit={handleSubmit}>
        <input
        data-testid="input-add-tarefa"
        type="text"
        value={newTarefa}
        onChange={(e) => setNewTarefa(e.target.value)}/>
        <Button type="submit">Salvar</Button>
       </Form>
      </header>
    </div>
  );
}

const Text = styled.p`
`
const Button = styled.button`
`

const Form = styled.form`
`
export default App;
