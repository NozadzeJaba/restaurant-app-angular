import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasketItem, AddToBasketRequest, UpdateBasketRequest } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private BASE_URL = "https://restaurant.stepprojects.ge/api/";

  constructor(private http: HttpClient) {}

  getBasket(): Observable<BasketItem[]> {
    return this.http.get<BasketItem[]>(`${this.BASE_URL}Baskets/GetAll`);
  }

  addToBasket(data: AddToBasketRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}Baskets/AddToBasket`, data);
  }

  updateBasket(data: UpdateBasketRequest): Observable<any> {
    return this.http.put(`${this.BASE_URL}Baskets/UpdateBasket`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}Baskets/DeleteProduct/${id}`);
  }
}
