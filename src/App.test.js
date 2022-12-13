import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import App from './App';

//importar o fireEvent e o userEvent, o primeiro é utilizado para disparar eventos, como cliques, mudanças de textos e submits.
//Já o Segundo fornece métodos que aproximam a realidade da iteração do usuário com a tela, como o "type" que dispara eventos como click, keydown, keyUp;
//É preferível que se use o userEvent ao fireevent
// A estrutura dos testes com jest e com react testing Library é a mesma;
describe('Testing App.js', () => {
  it("It Should be able to show the component Text", ()=>{
    //render APP é a forma com que mandamos o teste rendenizar o componente, retornando um render Result.
    render(<App />);
    //o método  screen é utilizados para fazer consultas  no DOM.
    const linkElement = screen.getByText(/Lista de tarefas a serem relizadas no dia/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("It Should be able to not render the list of activeties when the array is empty", ()=>{
    render(<App />);
    const linkElement = screen.getByText(/Ainda não há tarefas para o dia/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  it("It Should be able to add a new tarefa", ()=>{
    render(<App />);
// Buscamos o input de texto usando a query screen.getByTestId e o formulário que possui o data-testid="form-add-tech". É nesse momento que usamos os ids que definimos lá no componente.
    const input = screen.getByTestId("input-add-tarefa");
    const form = screen.getByTestId("form-add-tarefa");
// com o input e o form encontrados, podemos realizar ações em cima deles.
//o userEvent.type é responsável por preencher o campo input com "codar".
    userEvent.type(input, "codar");
// já o fireEvent.submit é responsǘael pela submissão desta informação no formulário.    
    fireEvent.submit(form);
//Espero que "codar" exista, ou seja o resultado da query screen.getByTestId("codar") seja true (verdadeiro). Ao contrário, retornaria falso e o teste falharia.
    expect(screen.getByTestId("codar")).toBeTruthy();
  });

  it("It Should be able to list 2 tarefas", ()=>{
    render(<App />);

    const input = screen.getByTestId("input-add-tarefa");
    const form = screen.getByTestId("form-add-tarefa");
// neste caso somente mostrando que também é possível realizar o preenchimento de um campo com o fireEvent.
    fireEvent.change(input,{ target: {value:"codar"} });
    fireEvent.submit(form);

    fireEvent.change(input,{ target: {value:"ira a academia"}});
    fireEvent.submit(form);

    const listOfTaferas = screen.getByTestId("ul-tarefas");
    expect(listOfTaferas.children.length).toBe(2);
  })

  it("It Should be able to delete 1 tarefa", ()=>{
    render(<App />);

    const input = screen.getByTestId("input-add-tarefa");
    const form = screen.getByTestId("form-add-tarefa");
    userEvent.type(input, "codar");
    fireEvent.submit(form);

// neste caso somente mostrando que também é possível realizar o submit a partir do click do userEvent.
    const itemButtonDelete = screen.getByTestId("codar-btn-delete");
    userEvent.click(itemButtonDelete);
    
    expect(screen.queryByTestId("codar")).toBeNull();
  })

});

