import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {  //Recebe a api
      setRepositories(response.data); //seta o data da api no state
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Teste2',
      url: 'teste2',
      techs: ['awdaw', 'awdawfg']
    });

    const repository = response.data;
    // console.log(repository)

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // console.log(id)
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 

        <li key={repository.id}>
          {repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
