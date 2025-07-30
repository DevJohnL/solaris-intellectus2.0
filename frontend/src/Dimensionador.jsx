// src/Dimensionador.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const initialState = {
  consumoMensalKwh: 500,
  latitude: -3.73,
  longitude: -38.52,
  custoKwh: 0.95,
  objetivoOtimizacao: 'PAYBACK',
};

function Dimensionador() {
  const [formData, setFormData] = useState(initialState);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDimensionar = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário
    try {
      setLoading(true);
      setError(null);
      setResultado(null);

      const { data, error: functionError } = await supabase.functions.invoke('dimensionar-sistema', {
        body: {
          ...formData,
          consumoMensalKwh: Number(formData.consumoMensalKwh),
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          custoKwh: Number(formData.custoKwh),
        }
      });

      if (functionError) throw functionError;
      setResultado(data);
    } catch (err) {
      console.error("Erro ao chamar a função:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dimensionador-container">
      <form onSubmit={handleDimensionar} className="dimensionador-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="consumoMensalKwh">Consumo Mensal (kWh)</label>
            <input id="consumoMensalKwh" name="consumoMensalKwh" type="number" value={formData.consumoMensalKwh} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="custoKwh">Custo do kWh (R$)</label>
            <input id="custoKwh" name="custoKwh" type="number" step="0.01" value={formData.custoKwh} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" name="latitude" type="number" value={formData.latitude} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" name="longitude" type="number" value={formData.longitude} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label htmlFor="objetivoOtimizacao">Meu Objetivo Principal é:</label>
            <select id="objetivoOtimizacao" name="objetivoOtimizacao" value={formData.objetivoOtimizacao} onChange={handleChange}>
              <option value="PAYBACK">O Menor Tempo de Retorno (Payback)</option>
              <option value="AUTONOMIA">A Máxima Autonomia Energética</option>
              <option value="CUSTO_INICIAL">O Menor Custo Inicial de Aquisição</option>
            </select>
          </div>
        </div>
        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Calculando...' : 'Dimensionar Meu Sistema'}
        </button>
      </form>

      {/* Área de Resultados */}
      <div className="resultado-container">
        {loading && <p className="loading-message">Buscando a melhor configuração para você...</p>}
        {error && <p className="error-message">Erro: {error}</p>}
        {resultado && (
          <div className="resultado-box">
            <h3>⚡️ Sistema Recomendado ⚡️</h3>
            <pre>{JSON.stringify(resultado, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dimensionador;