const API_URL = process.env.REACT_APP_API_URL;

export const criarConsulta = async (dados) => {
  const response = await fetch(`${API_URL}/consulta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return response.json();
};

export const listarConsultas = async () => {
  const response = await fetch(`${API_URL}/consulta`);
  return response.json();
};