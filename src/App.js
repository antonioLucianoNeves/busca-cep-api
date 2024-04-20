import { useState } from 'react';
import './App.css';
import api from './services/api';
import { CgSearch } from "react-icons/cg";


function App() {
  const [cep, setCep] = useState({});
  const [input, setInput] = useState("");

  
    async function BuscaCep () {
      if (input === ""){
        alert("Digite algum cep");
        return;
      }

      try {
        const response = await api.get(`${input}/json`);
        setCep(response.data);
        setInput("");
        
      } catch {
        alert("Opa! Tem algo errado aí")
        setInput("");
      }
    }
  return (
    <div className="container">
      <div>
          <h1 className='title'>Busca Cep</h1>
            <div className="inputContainer">
              <input type="text" value={input}
              placeholder='Digite o Cep' onChange={(e) => setInput( e.target.value)} />
              <button className="buttonSearch" onClick={BuscaCep}>
              <CgSearch size={25} color='#FFF' />
              </button>
            </div>
            {
              Object.keys(cep).length > 1 && (
                <main>
                  <h2>CEP: {cep.cep}</h2><br />
                  <span>Complemento: {cep.lagradouro}</span><br />
                  <span>Bairro: {cep.bairro}</span><br />
                  <span>{cep.localidade} - {cep.uf}</span>
                </main>
              )
            }
        </div>
    </div>
  );
}

export default App;
