import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ExerciseCard from './components/ExerciseCard';
import { generateExercise } from './services/geminiService';
import { Exercise } from './types';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setHasStarted(true);
    fetchNewExercise();
  };

  const fetchNewExercise = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const exercise = await generateExercise();
      setCurrentExercise(exercise);
    } catch (err) {
      console.error(err);
      setError("¡Vaya! El profe se ha dejado las tizas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (!hasStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 flex flex-col items-center">
      
      {/* Navbar / Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => setHasStarted(false)}
        >
          <span className="bg-green-500 text-white p-2 rounded-lg text-xl">📚</span>
          <span className="font-bold text-green-800 text-xl tracking-tight">Mates Andalucía</span>
        </div>
        <div className="bg-white px-4 py-1 rounded-full shadow-sm border border-green-100">
          <span className="text-sm text-green-600 font-medium">A practicar las Matemáticas</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center flex-grow justify-center pb-12">
        {error && (
          <div className="mb-6 bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow-sm max-w-md text-center border border-red-200">
            <p className="font-bold mb-2">Error</p>
            <p>{error}</p>
            <button 
              onClick={fetchNewExercise}
              className="mt-4 bg-red-200 hover:bg-red-300 text-red-800 px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Loading State or Exercise Card */}
        {loading && !currentExercise && !error ? (
          <div className="flex flex-col items-center animate-pulse">
            <div className="h-48 w-full max-w-2xl bg-gray-200 rounded-3xl mb-4"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded-xl"></div>
          </div>
        ) : currentExercise ? (
          <ExerciseCard 
            exercise={currentExercise} 
            onNext={fetchNewExercise} 
            loading={loading}
          />
        ) : null}
      </div>

    </div>
  );
};

export default App;