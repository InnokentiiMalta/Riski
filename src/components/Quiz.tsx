import { useState, useEffect } from 'react';
import { TestCategory, Question } from '../data/questions';

interface QuizProps {
  category: TestCategory;
  onBack: () => void;
}

export default function Quiz({ category, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);

  const question: Question = category.questions[currentQuestion];
  const totalQuestions = category.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  useEffect(() => {
    setAnimateIn(true);
    const timer = setTimeout(() => setAnimateIn(false), 300);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const getOptionClass = (index: number) => {
    if (!showExplanation) {
      if (selectedAnswer === index) {
        return 'border-blue-500 bg-blue-50 ring-2 ring-blue-200';
      }
      return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50';
    }
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 ring-2 ring-green-200';
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 ring-2 ring-red-200';
    }
    return 'border-gray-200 opacity-60';
  };

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return '🏆 Превосходно! Отличное знание темы!';
    if (percentage >= 80) return '✅ Хорошо! Вы хорошо разбираетесь в теме.';
    if (percentage >= 60) return '📚 Удовлетворительно. Рекомендуется повторить материал.';
    if (percentage >= 40) return '⚠️ Недостаточно. Необходимо изучить тему подробнее.';
    return '❌ Неудовлетворительно. Требуется серьёзная подготовка.';
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {(score / totalQuestions) * 100 >= 80 ? '🎉' : (score / totalQuestions) * 100 >= 60 ? '📝' : '📖'}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Тест завершён!
              </h2>
              <p className="text-gray-500 text-lg">{category.title}</p>
            </div>

            <div className="text-center mb-8">
              <div className={`text-5xl md:text-6xl font-bold ${getScoreColor()} mb-2`}>
                {score} / {totalQuestions}
              </div>
              <div className="text-lg text-gray-600 mb-2">
                Правильных ответов: {Math.round((score / totalQuestions) * 100)}%
              </div>
              <div className="text-xl font-medium text-gray-700">
                {getScoreMessage()}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  (score / totalQuestions) * 100 >= 80 ? 'bg-green-500' :
                  (score / totalQuestions) * 100 >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              ></div>
            </div>

            {/* Answer summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Обзор ответов:</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-bold ${
                      answer === category.questions[idx].correctAnswer
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-red-100 text-red-700 border-2 border-red-300'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                ← Вернуться к тестам
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                  setScore(0);
                  setAnswers([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                🔄 Пройти заново
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className="text-sm font-medium text-gray-500">
            Вопрос {currentQuestion + 1} из {totalQuestions}
          </div>
          <div className="text-sm font-bold text-blue-600">
            Счёт: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question card */}
        <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 ${animateIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {category.icon} {category.title}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${getOptionClass(index)} ${
                  !showExplanation ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showExplanation && index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : showExplanation && selectedAnswer === index && index !== question.correctAnswer
                      ? 'bg-red-500 text-white'
                      : selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {showExplanation && index === question.correctAnswer ? '✓' :
                     showExplanation && selectedAnswer === index && index !== question.correctAnswer ? '✗' :
                     String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700 pt-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-xl mb-6 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {selectedAnswer === question.correctAnswer ? '✅' : '💡'}
                </span>
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    {selectedAnswer === question.correctAnswer ? 'Правильно!' : 'Неправильно'}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleConfirm}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Подтвердить ответ
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                {currentQuestion < totalQuestions - 1 ? 'Следующий вопрос →' : 'Завершить тест'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
