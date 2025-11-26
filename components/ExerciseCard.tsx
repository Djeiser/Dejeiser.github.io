import React, { useState } from 'react';
import { Exercise, ExerciseType } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onNext: () => void;
  loading: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onNext, loading }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset local state when exercise changes
  React.useEffect(() => {
    setShowSolution(false);
    setShowHint(false);
  }, [exercise.id]);

  const getBadgeColor = (type: ExerciseType) => {
    switch (type) {
      case ExerciseType.STANDARD_PROBLEM: return 'bg-blue-100 text-blue-800 border-blue-200';
      case ExerciseType.CREATE_PROBLEM: return 'bg-purple-100 text-purple-800 border-purple-200';
      case ExerciseType.MULTIPLES_DIVISORS: return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-teal-100 text-teal-800 border-teal-200';
    }
  };

  const getTypeText = (type: ExerciseType) => {
    switch (type) {
      case ExerciseType.STANDARD_PROBLEM: return 'Problema Estándar';
      case ExerciseType.REMAINDER_INTERPRETATION: return '¿Qué sobra?';
      case ExerciseType.REFORMULATE_QUESTION: return 'Cambia la pregunta';
      case ExerciseType.GENERATE_QUESTIONS: return 'Busca preguntas';
      case ExerciseType.CREATE_PROBLEM: return '¡Inventor de Problemas!';
      case ExerciseType.MULTIPLES_DIVISORS: return 'Múltiplos y Divisores';
      default: return 'Ejercicio';
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white">
      {/* Header */}
      <div className={`p-6 ${getBadgeColor(exercise.type).split(' ')[0]} bg-opacity-50 flex justify-between items-center`}>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getBadgeColor(exercise.type)}`}>
          {getTypeText(exercise.type)}
        </span>
        <div className="text-gray-400 text-sm font-mono">#{exercise.id.slice(0, 4)}</div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-fredoka leading-tight">
          {exercise.title}
        </h2>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6 text-lg text-slate-700 leading-relaxed shadow-inner">
          <p className="mb-4 font-medium">{exercise.statement}</p>
          {exercise.question && (
            <p className="font-bold text-green-700 text-xl border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
              {exercise.question}
            </p>
          )}
        </div>

        {/* Action Area */}
        <div className="space-y-6">
          
          {/* Hint Section */}
          {exercise.hint && !showSolution && (
            <div className="flex justify-center">
               {!showHint ? (
                  <button 
                    onClick={() => setShowHint(true)}
                    className="text-sm text-amber-600 hover:text-amber-700 underline decoration-dotted decoration-2 underline-offset-4 font-medium flex items-center gap-1"
                  >
                    💡 Necesito una pista
                  </button>
               ) : (
                 <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-sm animate-fade-in">
                    💡 <strong>Pista:</strong> {exercise.hint}
                 </div>
               )}
            </div>
          )}

          {/* Solution Section */}
          {showSolution ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 animate-fade-in-up">
              <h3 className="font-bold text-green-800 text-lg mb-2 flex items-center gap-2">
                <span>✅</span> Solución:
              </h3>
              <p className="text-gray-800 font-bold text-xl mb-4">{exercise.solution}</p>
              
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Explicación</h4>
                <p className="text-gray-600 whitespace-pre-line">{exercise.explanation}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowSolution(true)}
              className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-bold hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all group"
            >
              <span className="group-hover:scale-110 inline-block transition-transform duration-200">👁️</span> Ver Solución
            </button>
          )}

        </div>
      </div>

      {/* Footer / Controls */}
      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button
          onClick={onNext}
          disabled={loading}
          className={`
            px-8 py-3 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-2 transition-all
            ${loading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl active:scale-95'
            }
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Pensando...
            </>
          ) : (
            <>
              Siguiente Ejercicio <span>🎲</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;