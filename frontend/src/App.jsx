// src/App.jsx
import Dimensionador from './Dimensionador';
import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Solaris Intellectus</h1>
        <p>A calculadora solar inteligente para otimizar seu investimento.</p>
      </header>
      <main>
        {/* Carrega o componente Dimensionador diretamente */}
        <Dimensionador />
      </main>
    </div>
  );
}

export default App;