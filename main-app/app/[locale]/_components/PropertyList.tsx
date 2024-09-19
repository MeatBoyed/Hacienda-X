import React from 'react';
import PropertyCard from '@/components/main/PropertyCard';
import { PropertyWithAddress } from '@/Server/utils/utils';

interface PropertyListProps {
  properties: PropertyWithAddress[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
