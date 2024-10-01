import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageSrc }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-96">
    <Image src={imageSrc} alt={title} width={300} height={400} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <h3 className="text-white text-2xl font-bold">{title}</h3>
    </div>
  </div>
);

const CategoryGrid: React.FC = () => {
  const t = useTranslations('Index.CategoryGrid');

  const categories = [
    { title: t('categories.apartments'), imageSrc: '/./apartmentimage.jpg' },
    { title: t('categories.villa'), imageSrc: '/./villaimage.jpg' },
    { title: t('categories.townhouse'), imageSrc: '/./townhouseimage.jpg' },
    { title: t('categories.condo'), imageSrc: '/./condoimage.jpg' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t('heading')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;