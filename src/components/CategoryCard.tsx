import { TestCategory } from '../data/questions';

interface CategoryCardProps {
  category: TestCategory;
  onSelect: (category: TestCategory) => void;
}

export default function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <button
      onClick={() => onSelect(category)}
      className="group w-full text-left bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {category.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                📝 {category.questions.length} вопросов
              </span>
            </div>
          </div>
          <div className="text-gray-300 group-hover:text-blue-500 transition-colors text-2xl">
            →
          </div>
        </div>
      </div>
    </button>
  );
}
