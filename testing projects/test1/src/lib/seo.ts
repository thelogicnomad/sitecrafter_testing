import { useEffect } from 'react';
    
    export function useSEO({ title, description }: { title: string, description: string }) {
      useEffect(() => {
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
      }, [title, description]);
    }