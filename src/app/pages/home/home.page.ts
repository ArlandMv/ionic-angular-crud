import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItemSliding,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  list,
  informationCircle,
  star,
  starOutline,
  addCircle,
  pricetag,
  checkboxOutline,
  cloudUpload,
  statsChart,
} from 'ionicons/icons';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItemSliding,
  ],
})
export class HomePage implements OnInit {
  productService = inject(ProductService);
  products = this.productService.getProducts();

  constructor() {
    addIcons({
      addCircle,
      pricetag,
      star,
      starOutline,
      checkboxOutline,
      cloudUpload,
      statsChart,
    });
  }

  ngOnInit() {}

  // Get only favorite products
  favoriteProducts = () => this.products().filter((p) => p.favorite);

  toggleFavorite(productId: string) {
    const product = this.products().find((p: any) => p.id === productId);
    if (product) {
      this.productService.updateProduct(productId, {
        favorite: !product.favorite,
      });
    }
  }
}
