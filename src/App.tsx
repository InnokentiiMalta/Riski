import { useState } from 'react';
import { testCategories, TestCategory } from './data/questions';
import Quiz from './components/Quiz';
import CategoryCard from './components/CategoryCard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | null>(null);

  if (selectedCategory) {
    return <Quiz category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-blue-100 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Система тестирования
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Управление рисками в
              <br />
              <span className="text-blue-200">промышленной безопасности</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Проверьте свои знания по идентификации опасностей, оценке рисков, мерам контроля и нормативным требованиям
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                <span>📋</span>
                <span>{testCategories.length} тем</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                <span>📝</span>
                <span>{testCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} вопросов</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                <span>🎯</span>
                <span>Мгновенная проверка</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Выберите тему теста
          </h2>
          <p className="text-gray-500">
            Каждая тема содержит вопросы с подробными пояснениями к ответам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={setSelectedCategory}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            О системе тестирования
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                📖
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Обучение</h4>
                <p className="text-sm text-gray-500">
                  Каждый вопрос сопровождается подробным объяснением правильного ответа
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                ✅
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Самопроверка</h4>
                <p className="text-sm text-gray-500">
                  Мгновенная проверка ответов с визуальной индикацией правильности
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                📊
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Результаты</h4>
                <p className="text-sm text-gray-500">
                  Итоговая оценка с рекомендациями и обзором всех ответов
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Topics */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            Ключевые темы для изучения
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Идентификация опасностей и вредных факторов',
              'Методы анализа рисков (HAZOP, FMEA, Bow-tie)',
              'Матрица рисков и количественная оценка',
              'Иерархия мер контроля рисков',
              'Принцип ALARP',
              'Федеральный закон №116-ФЗ',
              'Декларация промышленной безопасности',
              'Система управления промышленной безопасностью',
              'Планы локализации аварий (ПЛАС)',
              'Средства индивидуальной защиты',
              'Расследование инцидентов и аварий',
              'Аттестация персонала в области ПБ'
            ].map((topic, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            Тесты по управлению рисками в промышленной безопасности
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Материалы основаны на требованиях ФЗ-116, ФНиП и других нормативных документах в области промышленной безопасности
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
