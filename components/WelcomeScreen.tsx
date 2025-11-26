import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-green-100 to-green-200">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full transform transition-all hover:scale-105 duration-300">
        <h1 className="text-5xl font-bold text-green-600 mb-6 drop-shadow-sm">
          ¡A Practicar!
        </h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">
          Repaso de Matemáticas - 5º Primaria
          <br />
          <span className="text-sm text-gray-400 mt-2 block">Preparados para el examen</span>
        </p>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 text-left">
            <h3 className="font-bold text-green-700 mb-2">¿Qué vamos a repasar?</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Operaciones sin decimales</li>
              <li>Múltiplos y divisores</li>
              <li>Inventar y resolver problemas</li>
              <li>Interpretar restos</li>
            </ul>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-8 rounded-2xl shadow-lg transform transition active:scale-95 active:bg-green-700 flex items-center justify-center gap-2"
          >
            <span>🚀</span> Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;