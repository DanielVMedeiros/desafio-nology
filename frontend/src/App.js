import { useState } from "react";
import CashbackModal from "./components/CashbackModal";
import ConsultasModal from "./components/ConsultasModal";
import { criarConsulta, listarConsultas } from "./services/api";
import "./App.css";


function App() {
  const [tipoCliente, setTipoCliente] = useState("normal");
  const [valor, setValor] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [cashback, setCashback] = useState(null);

  const [showCashbackModal, setShowCashbackModal] = useState(false);
  const [showConsultasModal, setShowConsultasModal] = useState(false);

  const handleCriar = async () => {
    const data = await criarConsulta({
      tipo_cliente: tipoCliente,
      valor: parseFloat(valor),
      cashback: 0,
    });

    setCashback(data.cashback);
    setShowCashbackModal(true);
    setValor("");
  };

  const handleListar = async () => {
    const data = await listarConsultas();
    setConsultas(data);
    setShowConsultasModal(true);
  };

  return (
  <div className="container">
    <div className="card">
      <img src="/image.png" alt="Logo" style={{ width: "150px", borderRadius: "10px", alignItems:"center", display: "block" ,margin: "0 auto" }} />
      <h1 className="title">Calcule o Cashback!</h1>

      <label className="label">Tipo de Cliente</label>
      <select
        className="input"
        value={tipoCliente}
        onChange={(e) => setTipoCliente(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="VIP">VIP</option>
      </select>

      <label className="label">Valor final</label>
      <input
        className="input no-spinner"
        type="number"
        min="0"
        placeholder="Digite o valor final (já com desconto)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <div className="buttonGroup">
        <button className="button primary" onClick={handleCriar}>
          Criar
        </button>

        <button className="button secondary" onClick={handleListar}>
          Listar
        </button>
      </div>

      {showCashbackModal && (
        <CashbackModal
          cashback={cashback}
          onClose={() => setShowCashbackModal(false)}
        />
      )}

      {showConsultasModal && (
        <ConsultasModal
          consultas={consultas}
          onClose={() => setShowConsultasModal(false)}
        />
      )}
    </div>
  </div>
);
}

export default App;