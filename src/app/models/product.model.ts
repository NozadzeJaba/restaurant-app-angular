export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  nuts: boolean;
  vegeterian: boolean;
  spiciness: number;
  categoryId?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductFilters {
  vegeterian: boolean;
  nuts: boolean;
  spiciness: number;
}

