import { GoogleGenAI, Type } from "@google/genai";
import { Exercise, ExerciseType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres un maestro de matemáticas experto de un colegio de primaria en Andalucía, España.
Tu audiencia son niños de 10 años (5º de Primaria).

ESTILO Y CONTEXTO:
1. Usa un tono animado, motivador y cercano.
2. Contextualiza los problemas en Andalucía (aceitunas, naranjas, la Alhambra, la playa, la feria, pueblos blancos, etc.).
3. Crea pequeñas historias atractivas para que el alumno se interese por el problema.
4. Prioriza la claridad y legibilidad (evita símbolos como "@").

REGLAS MATEMÁTICAS ESTRICTAS:
1. Números máximos: 99.999.
2. Divisiones: El divisor NUNCA puede ser mayor de 50.
3. Operaciones permitidas: Suma, Resta, Multiplicación (x1 o x2 cifras), División (entre 1 o 2 cifras).
4. Sin decimales en los operandos ni resultados (división entera con resto es válida).

TIPOS DE EJERCICIOS (Generar uno aleatorio de esta lista):
1. PROBLEMA ESTÁNDAR: Se resuelve con 1 o 2 operaciones.
2. INTERPRETACIÓN DEL RESTO: Un problema de división donde la clave es saber cuánto sobra y qué significa.
3. REFORMULAR PREGUNTAS: Dado un enunciado corto, pedir al alumno que escriba una pregunta diferente.
4. GENERAR PREGUNTAS: Dado un enunciado corto o datos, pedir todas las preguntas posibles.
5. CREAR PROBLEMA: Dadas unas operaciones (ej: 25 x 4) o unos datos, pedir al alumno que invente la letra del problema.
6. MÚLTIPLOS Y DIVISORES: Problemas de mcd, mcm (sencillos), o lógica de divisibilidad.

SALIDA:
Devuelve SIEMPRE un JSON válido.
`;

export const generateExercise = async (): Promise<Exercise> => {
  const modelId = "gemini-2.5-flash"; // Fast and capable for this logic
  
  const response = await ai.models.generateContent({
    model: modelId,
    contents: "Genera un ejercicio de matemáticas aleatorio para el examen de 5º de primaria siguiendo las reglas.",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Un título corto y divertido (3-5 palabras)" },
          type: { 
            type: Type.STRING, 
            enum: [
              'STANDARD_PROBLEM', 
              'REMAINDER_INTERPRETATION', 
              'REFORMULATE_QUESTION', 
              'GENERATE_QUESTIONS', 
              'CREATE_PROBLEM', 
              'MULTIPLES_DIVISORS'
            ] 
          },
          statement: { type: Type.STRING, description: "El enunciado del problema (con narrativa andaluza) o los datos." },
          question: { type: Type.STRING, description: "La pregunta específica (si aplica)" },
          solution: { type: Type.STRING, description: "La solución correcta" },
          explanation: { type: Type.STRING, description: "Explicación paso a paso" },
          hint: { type: Type.STRING, description: "Una pista útil" }
        },
        required: ["title", "type", "statement", "solution", "explanation"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No se pudo generar el ejercicio");
  }

  const data = JSON.parse(response.text);

  // Map string type to Enum
  const mapType = (t: string): ExerciseType => {
    if (Object.values(ExerciseType).includes(t as ExerciseType)) {
      return t as ExerciseType;
    }
    return ExerciseType.STANDARD_PROBLEM;
  };

  return {
    id: crypto.randomUUID(),
    title: data.title,
    type: mapType(data.type),
    statement: data.statement,
    question: data.question,
    solution: data.solution,
    explanation: data.explanation,
    hint: data.hint,
    hasClosedSolution: [
      'STANDARD_PROBLEM', 
      'REMAINDER_INTERPRETATION', 
      'MULTIPLES_DIVISORS'
    ].includes(data.type),
  };
};