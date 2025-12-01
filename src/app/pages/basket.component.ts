import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { BasketItem } from '../models/basket.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  items: BasketItem[] = [];
  total = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.basketService.getBasket().subscribe({
      next: (res: BasketItem[]) => {
        this.items = res || [];
        this.calculateTotal();
      },
      error: (err: any) => console.error(err)
    });
  }

  calculateTotal(): void {
    // el.price is already the total price (price * quantity) from API
    this.total = this.items.reduce((s: number, el: BasketItem) => s + el.price, 0);
  }

  increase(item: BasketItem): void {
    if (!item.product) return;
    const newQ = item.quantity + 1;
    const totalPrice = item.product.price * newQ;
    this.basketService.updateBasket({ 
      quantity: newQ, 
      price: totalPrice, 
      productId: item.product.id 
    }).subscribe(() => this.loadBasket());
  }

  decrease(item: BasketItem): void {
    if (!item.product) return;
    if (item.quantity <= 1) {
      if (confirm('ნამდვილად გსურს ამ პროდუქტის წაშლა კალათიდან?')) {
        this.delete(item.product.id);
      }
      return;
    }
    const newQ = item.quantity - 1;
    const totalPrice = item.product.price * newQ;
    this.basketService.updateBasket({ 
      quantity: newQ, 
      price: totalPrice, 
      productId: item.product.id 
    }).subscribe(() => this.loadBasket());
  }

  delete(productId: number): void {
    this.basketService.deleteProduct(productId).subscribe(() => this.loadBasket());
  }
}
