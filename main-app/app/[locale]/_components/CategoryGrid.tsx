import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageSrc }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Image src={imageSrc} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <h3 className="text-white text-xl font-bold">{title}</h3>
    </div>
  </div>
);

const CategoryGrid: React.FC = () => {
  const categories = [
    { title: 'Apartments', imageSrc: '/images/apartment.jpg' },
    { title: 'Villa', imageSrc: '/images/villa.jpg' },
    { title: 'Townhouse', imageSrc: '/images/townhouse.jpg' },
    { title: 'Condo', imageSrc: '/images/condo.jpg' },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Property Categories</h2>
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