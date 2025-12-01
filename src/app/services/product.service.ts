import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = "https://restaurant.stepprojects.ge/api/";

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}Products/GetAll`);
  }

  getProductsByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}Categories/GetCategory/${id}`);
  }

  getFilteredProducts(filters: any): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.BASE_URL}Products/GetFiltered?vegeterian=${filters.vegeterian}&nuts=${filters.nuts}&spiciness=${filters.spiciness}`
    );
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}Categories/GetAll`);
  }
}
