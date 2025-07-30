// src/Login.jsx
import React from 'react';
import { supabase } from './supabaseClient';

function Login() {
  // Função para login com Google
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Erro no login com Google:', error);
      alert(error.message);
    }
  }

  // --- NOVO ---
  // Função para login anônimo
  async function signInAnonymously() {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('Erro no login anônimo:', error);
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Bem-vindo ao Solaris Intellectus</h2>
      <p>Faça login ou continue como visitante para começar.</p>

      {/* Botão de Login com Google */}
      <button 
        onClick={signInWithGoogle} 
        style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#4285F4', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '10px' // Espaçamento
        }}
      >
        Entrar com Google
      </button>

      {/* --- NOVO BOTÃO --- */}
      <button 
        onClick={signInAnonymously}
        style={{
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#666', // Cor diferente
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Continuar sem Login (Modo Visitante)
      </button>
    </div>
  );
}

export default Login;