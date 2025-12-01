import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { BasketService } from '../services/basket.service';
import { Product, Category } from '../models/product.model';
import { BasketItem } from '../models/basket.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  basketCount = 0;
  currentCategory: number | null = null;

  filters = {
    vegeterian: false,
    nuts: false,
    spiciness: 0
  };

  spiceValueText = 'Not chosen';

  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.updateBasketCount();
  }

  loadCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (res: Category[]) => this.categories = res || [],
      error: (err: any) => console.error(err)
    });
  }

  loadProducts(): void {
    this.currentCategory = null;
    this.productService.getAllProducts().subscribe({
      next: (res: Product[]) => this.products = res || [],
      error: (err: any) => console.error(err)
    });
  }

  filterByCategory(id: number): void {
    this.currentCategory = id;
    this.productService.getProductsByCategory(id).subscribe({
      next: (res: any) => this.products = res.products || [],
      error: (err: any) => console.error(err)
    });
  }

  applyFilter(): void {
    if (this.currentCategory !== null) {
      this.productService.getProductsByCategory(this.currentCategory).subscribe({
        next: (res: any) => {
          const products = res.products || [];
          this.products = this.applyFiltersToProducts(products);
        }
      });
    } else {
      this.productService.getFilteredProducts(this.filters).subscribe({
        next: (res: Product[]) => this.products = res || []
      });
    }
  }

  applyFiltersToProducts(products: Product[]): Product[] {
    return products.filter(p => {
      if (this.filters.vegeterian && !p.vegeterian) return false;
      if (this.filters.nuts && p.nuts) return false;
      if (this.filters.spiciness > 0 && p.spiciness !== Number(this.filters.spiciness)) return false;
      return true;
    });
  }

  resetFilters(): void {
    this.filters = { vegeterian: false, nuts: false, spiciness: 0 };
    this.spiceValueText = 'Not chosen';
    if (this.currentCategory !== null) this.filterByCategory(this.currentCategory);
    else this.loadProducts();
  }

  onSpiceInput(val: any) {
    this.filters.spiciness = Number(val);
    this.spiceValueText = this.filters.spiciness === 0 ? 'Not chosen' : String(this.filters.spiciness);
  }

  addToBasket(p: Product): void {
    const body = { quantity: 1, price: p.price, productId: p.id };
    // First check existing items and either add or update like original code.
    this.basketService.getBasket().subscribe({
      next: (basket: BasketItem[]) => {
        const existing = basket.find((b: BasketItem) => b.product?.id === p.id);
        if (existing && existing.product) {
          const newQuantity = existing.quantity + 1;
          const totalPrice = existing.product.price * newQuantity;
          this.basketService.updateBasket({ 
            quantity: newQuantity, 
            price: totalPrice, 
            productId: p.id 
          }).subscribe({
            next: () => {
              alert('Product quantity increased in basket');
              this.updateBasketCount();
            },
            error: (err: any) => {
              console.error(err);
              alert('Something went wrong');
            }
          });
        } else {
          this.basketService.addToBasket(body).subscribe({
            next: () => {
              alert('Product added to basket');
              this.updateBasketCount();
            },
            error: (err: any) => {
              console.error(err);
              alert('Something went wrong');
            }
          });
        }
      },
      error: (err: any) => {
        console.error(err);
        alert('Something went wrong loading basket');
      }
    });
  }

  updateBasketCount(): void {
    this.basketService.getBasket().subscribe({
      next: (res: BasketItem[]) => {
        const total = res.reduce((s: number, el: BasketItem) => s + el.quantity, 0);
        this.basketCount = total;
      },
      error: (err: any) => console.error(err)
    });
  }

}
