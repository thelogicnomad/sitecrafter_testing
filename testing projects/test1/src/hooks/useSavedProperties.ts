import { create } from 'zustand';
    import { persist, createJSONStorage } from 'zustand/middleware';
    
    interface SavedPropertiesState {
      savedPropertyIds: string[];
      toggleSaved: (propertyId: string) => void;
      isSaved: (propertyId: string) => boolean;
    }
    
    const useSavedProperties = create<SavedPropertiesState>()(
      persist(
        (set, get) => ({
          savedPropertyIds: [],
          isSaved: (propertyId: string) => get().savedPropertyIds.includes(propertyId),
          toggleSaved: (propertyId: string) => {
            const { savedPropertyIds } = get();
            const newSavedIds = savedPropertyIds.includes(propertyId)
              ? savedPropertyIds.filter((id) => id !== propertyId)
              : [...savedPropertyIds, propertyId];
            set({ savedPropertyIds: newSavedIds });
          },
        }),
        {
          name: 'saved-properties-storage',
          storage: createJSONStorage(() => localStorage),
        }
      )
    );
    
    export default useSavedProperties;