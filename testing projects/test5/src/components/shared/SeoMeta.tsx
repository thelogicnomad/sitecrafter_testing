import React from 'react';

interface SeoMetaProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SeoMeta: React.FC<SeoMetaProps> = ({ title, description, children }) => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const newMeta = document.createElement('meta');
    newMeta.name = 'description';
    newMeta.content = description;
    document.head.appendChild(newMeta);
  }

  return <>{children}</>;
};

export default SeoMeta;