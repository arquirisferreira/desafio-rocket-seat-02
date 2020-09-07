import React, {useState, useEffect} from "react";

import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
            
      title: `Novo Repositório ${Date.now()}`,
      owner: "Arquiris Ferreira"
  
});

    const repositorie = response.data;

    setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>

            <ul data-testid="repository-list">
                {repositories.map(repos => <li key={repos.id}>{repos.title}
                  <button onClick={() => handleRemoveRepository(repos.id)}>
                    Remover
                  </button>
                </li>)}
            </ul>
      
     

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
