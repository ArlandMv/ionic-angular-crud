import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, create, alertCircle } from 'ionicons/icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ClpPipe } from 'src/app/pipes/clppipe.pipe';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, ClpPipe],
})
export class ProductsListPage implements OnInit {
  private productService = inject(ProductService);
  products = this.productService.getProducts();
  private fb = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(1)]],
  });

  editingProduct: Product | null = null;

  // Move form to modal
  //showAddForm = signal(false);
  //deleteConfirmId = signal<string | null>(null);

  constructor() {
    addIcons({ create, trash, alertCircle, add });
  }

  ngOnInit(): void {
    console.log('ProductsListPage initialized');
  }

  ngAfterViewInit(): void {
    console.log('View initialized');
  }

  ngOnDestroy(): void {
    console.log('ProductsListPage destroyed');
    // save state to localStorage.
  }

  onSubmit(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
      });
      this.editingProduct = null;
    } else {
      this.productService.addProduct({
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
      });
    }
    this.productForm.reset();
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id);
  }

  toggleBought(product: Product): void {
    this.productService.updateProduct(product.id, { bought: !product.bought });
  }

  toggleFavorite(product: Product): void {
    this.productService.updateProduct(product.id, {
      favorite: !product.favorite,
    });
  }
}
