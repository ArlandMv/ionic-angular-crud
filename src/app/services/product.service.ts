import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([]);

  constructor() {
    this.initializeProducts();
  }

  private initializeProducts(): void {
    const initialData = [
      {
        id: this.generateId(),
        name: 'Ionic Book',
        description: 'Learn Ionic development',
        price: 39000,
        favorite: false,
        bought: false,
      },
      {
        id: this.generateId(),
        name: 'Angular Guide',
        description: 'Master Angular framework',
        price: 29000,
        favorite: false,
        bought: false,
      },
    ];
    this.products.set(initialData);
  }

  getProducts() {
    return this.products.asReadonly();
  }

  addProduct(product: Omit<Product, 'id' | 'favorite' | 'bought'>): void {
    this.products.update((items) => [
      ...items,
      {
        ...product,
        id: this.generateId(),
        favorite: false, // Default value
        bought: false, // Default value
      },
    ]);
  }

  updateProduct(id: string, updatedProduct: Partial<Product>): void {
    this.products.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item
      )
    );
  }

  deleteProduct(id: string): void {
    this.products.update((items) => items.filter((item) => item.id !== id));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 11);
  }
}
