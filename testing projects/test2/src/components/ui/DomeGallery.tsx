import React from 'react';
    // Placeholder for DomeGallery
    const DomeGallery: React.FC<{images: string[]}> = ({images}) => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((src, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg aspect-square">
                    <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
            ))}
        </div>
    );
    export default DomeGallery;