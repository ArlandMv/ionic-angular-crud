import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should load initial products', () => {
      const products = service.getProducts()();
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Ionic Book');
      expect(products[0].favorite).toBeFalse();
    });
  });

  describe('CRUD Operations', () => {
    let testProduct: Omit<Product, 'id'>;

    beforeEach(() => {
      testProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: 9.99,
        favorite: true, // overridden to false
        bought: false,
      };
    });

    it('should add a new product with defaults', () => {
      service.addProduct(testProduct);
      const products = service.getProducts()();

      const addedProduct = products[2];
      expect(products.length).toBe(3);
      expect(addedProduct.id).toMatch(/^[a-z0-9]+$/);
      expect(addedProduct.favorite).toBeFalse();
      expect(addedProduct.bought).toBeFalse();
    });

    it('should update product properties', () => {
      const original = service.getProducts()()[0];
      service.updateProduct(original.id, { price: 49.99, favorite: true });

      const updated = service.getProducts()()[0];
      expect(updated.price).toBe(49.99);
      expect(updated.favorite).toBeTrue();
      expect(updated.name).toBe(original.name); // Unchanged
    });

    it('should delete a product', () => {
      const initialCount = service.getProducts()().length;
      const targetId = service.getProducts()()[0].id;

      service.deleteProduct(targetId);
      const remaining = service.getProducts()();

      expect(remaining.length).toBe(initialCount - 1);
      expect(remaining.some((p) => p.id === targetId)).toBeFalse();
    });
  });

  describe('ID Generation', () => {
    it('should generate unique IDs', () => {
      const id1 = (service as any).generateId();
      const id2 = (service as any).generateId();

      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(10);
    });

    it('should use valid base36 characters', () => {
      const id = (service as any).generateId();
      expect(id).toMatch(/^[a-z0-9]+$/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle unknown ID for update', () => {
      const initialProducts = service.getProducts()();
      service.updateProduct('invalid-id', { name: 'New Name' });
      expect(service.getProducts()()).toEqual(initialProducts);
    });

    it('should ignore delete for non-existent ID', () => {
      const initialCount = service.getProducts()().length;
      service.deleteProduct('fake-id');
      expect(service.getProducts()().length).toBe(initialCount);
    });
  });
});
