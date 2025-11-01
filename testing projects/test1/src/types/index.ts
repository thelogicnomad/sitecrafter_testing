export interface Property {
        id: string;
        title: string;
        price: number;
        location: string;
        imageUrl: string;
        images: string[];
        beds: number;
        baths: number;
        sqft: number;
        propertyType: 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Land' | 'Commercial';
        yearBuilt: number;
        lotSize?: string;
        description: string;
        features: string[];
        agent: {
            name: string;
            phone: string;
            email: string;
            imageUrl: string;
        };
        latitude: number;
        longitude: number;
    }