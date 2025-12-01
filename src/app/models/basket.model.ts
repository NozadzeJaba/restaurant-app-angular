import { Product } from './product.model';

export interface BasketItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product?: Product;
}

export interface AddToBasketRequest {
  quantity: number;
  price: number;
  productId: number;
}

export interface UpdateBasketRequest {
  quantity: number;
  price: number;
  productId: number;
}

