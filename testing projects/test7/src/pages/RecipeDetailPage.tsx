import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoaderCircle, Star } from 'lucide-react';
import Button from '@/components/common/Button';
import { useCartStore } from '@/state/cartStore';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: recipe, isLoading, isError } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => api.fetchRecipeById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoaderCircle className="w-16 h-16 animate-spin text-primary" /></div>;
  }

  if (isError || !recipe) {
    return <div className="text-center py-20">Error loading recipe or recipe not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-auto object-cover rounded-lg shadow-xl" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 bg-primary-light/20 text-primary rounded-full text-sm font-semibold mb-4">
            {recipe.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">{recipe.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < Math.round(recipe.rating) ? "text-accent fill-current" : "text-muted"} />
              ))}
            </div>
            <span className="text-foreground/70">({recipe.reviews} reviews)</span>
          </div>
          <p className="text-lg text-foreground/80 mb-6">{recipe.description}</p>
          <p className="text-4xl font-bold text-primary mb-8">${recipe.price}</p>
          
          <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                  {recipe.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-muted/50 rounded-full text-sm capitalize">{tag}</span>
                  ))}
              </div>
          </div>

          <div className="mt-8">
            <Button onClick={() => addToCart(recipe)} size="lg" className="w-full md:w-auto">
              Add to Cart
            </Button>
          </div>

          <div className="mt-12 border-t pt-8 space-y-4 text-foreground/80">
              <h3 className="font-semibold text-xl text-primary">Details</h3>
              <p><strong>Ingredients:</strong> We use only the finest, locally-sourced ingredients. For specific allergen information, please contact us.</p>
              <p><strong>Preparation:</strong> Each cake is baked to order and requires a minimum of 4 hours preparation time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;