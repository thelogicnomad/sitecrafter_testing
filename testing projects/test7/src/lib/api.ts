import { mockRecipes, mockUser } from '@/types/mockData';
import type { Recipe, UserProfile } from '@/types';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  fetchRecipes: async (page: number, filters: any, sort: string): Promise<{ data: Recipe[], totalPages: number, currentPage: number }> => {
    await delay(500);
    
    let filteredRecipes = [...mockRecipes];

    if (filters.category) {
      filteredRecipes = filteredRecipes.filter(r => r.category === filters.category);
    }
    if (filters.flavor) {
        filteredRecipes = filteredRecipes.filter(r => r.tags.includes(filters.flavor.toLowerCase()));
    }
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredRecipes = filteredRecipes.filter(r => r.name.toLowerCase().includes(searchTerm) || r.description.toLowerCase().includes(searchTerm));
    }

    if (sort === 'price-asc') {
      filteredRecipes.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filteredRecipes.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating-desc') {
        filteredRecipes.sort((a, b) => b.rating - a.rating);
    }

    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);
    
    return {
      data: paginatedData,
      totalPages,
      currentPage: page,
    };
  },
  fetchRecipeById: async (id: string): Promise<Recipe | undefined> => {
    await delay(300);
    return mockRecipes.find(recipe => recipe.id === id);
  },
  fetchUserProfile: async (): Promise<UserProfile> => {
    await delay(400);
    return mockUser;
  },
  submitContactForm: async (data: any): Promise<{ success: boolean }> => {
    console.log("Submitting contact form data:", data);
    await delay(1000);
    // Simulate a random failure
    if (Math.random() < 0.1) {
        return { success: false };
    }
    return { success: true };
  }
};