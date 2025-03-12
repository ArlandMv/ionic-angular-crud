import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListPage } from './products-list.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClpPipe } from 'src/app/pipes/clppipe.pipe';
import { ProductService } from '../../services/product.service';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product';

// Create a spy object for ProductService with the methods we use.
const productServiceSpy = jasmine.createSpyObj('ProductService', [
  'getProducts',
  'addProduct',
  'updateProduct',
  'deleteProduct',
]);

// Default behavior for getProducts: return an empty array signal.
productServiceSpy.getProducts.and.returnValue(() => []);

describe('ProductsListPage', () => {
  let component: ProductsListPage;
  let fixture: ComponentFixture<ProductsListPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        CommonModule,
        ClpPipe,
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =======================================================
  // Form Validation Tests
  // =======================================================
  describe('Form Validation', () => {
    it('should mark the form invalid if name is empty', () => {
      component.productForm.controls['name'].setValue('');
      expect(component.productForm.valid).toBeFalse();
    });

    it('should mark the form invalid if price is less than 1', () => {
      component.productForm.controls['price'].setValue(0);
      expect(component.productForm.controls['price'].valid).toBeFalse();
      expect(
        component.productForm.controls['price'].hasError('min')
      ).toBeTrue();
    });

    it('should mark the form invalid if description exceeds maximum length', () => {
      component.productForm.controls['description'].setValue('a'.repeat(101));
      expect(component.productForm.controls['description'].valid).toBeFalse();
      expect(
        component.productForm.controls['description'].hasError('maxlength')
      ).toBeTrue();
    });

    it('should mark the form as valid when all fields are valid', () => {
      component.productForm.setValue({
        name: 'Test Product',
        description: 'Valid desc',
        price: 10,
      });
      expect(component.productForm.valid).toBeTrue();
    });
  });

  // =======================================================
  // Service Method Call Tests
  // =======================================================
  describe('Service Method Calls', () => {
    it('should call addProduct when submitting a new product', () => {
      component.productForm.setValue({
        name: 'New Product',
        description: 'New desc',
        price: 15,
      });
      component.editingProduct = null;
      component.onSubmit();
      expect(productServiceSpy.addProduct).toHaveBeenCalledWith({
        name: 'New Product',
        description: 'New desc',
        price: 15,
      });
    });

    it('should call updateProduct when editing an existing product', () => {
      const fakeProduct: Product = {
        id: '123',
        name: 'Old Name',
        description: 'Old desc',
        price: 5,
        favorite: false,
        bought: false,
      };
      component.editingProduct = fakeProduct;
      component.productForm.setValue({
        name: 'Updated Name',
        description: 'Updated desc',
        price: 20,
      });
      component.onSubmit();
      expect(productServiceSpy.updateProduct).toHaveBeenCalledWith('123', {
        name: 'Updated Name',
        description: 'Updated desc',
        price: 20,
      });
    });
  });

  // =======================================================
  // DOM Interaction Tests
  // =======================================================
  describe('DOM Interactions', () => {
    it('should display an error note when price is invalid', () => {
      component.productForm.controls['price'].setValue(0);
      fixture.detectChanges();
      const errorNote = fixture.debugElement.query(
        By.css('ion-note[slot="error"]')
      );
      expect(errorNote).toBeTruthy();
      expect(errorNote.nativeElement.textContent).toContain(
        'Price must be greater than 0'
      );
    });

    /*
    it('should call deleteProduct when the delete button is clicked', async () => {
      // Arrange: Provide a fake product in the list.
      const fakeProduct: Product = {
        id: '456',
        name: 'Test Product',
        description: 'Desc',
        price: 20,
        favorite: false,
        bought: false,
      };
      // Override getProducts() to return the fake product.
      productS erviceSpy.getProducts.and.returnValue(() => [fakeProduct]);
      component.products = productServiceSpy.getProducts();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      //console.log('Rendered HTML:', fixture.nativeElement.innerHTML);

      // Act: Find the delete button
      const deleteButtonDe = fixture.debugElement.query(By.css('.delete-btn'));
      console.log('Delete deleteButtonDe:', deleteButtonDe);
      deleteButtonDe.nativeElement.click();
      fixture.detectChanges();

      // Assert: Verify that deleteProduct was called with the correct id.
      expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('456');
    });
    */

    it('should call deleteProduct when user confirms deletion', async () => {
      // Arrange: Create a fake alert object that simulates user confirming deletion.
      const fakeAlert = {
        present: () => Promise.resolve(),
        onDidDismiss: () => Promise.resolve({ role: 'confirm' }),
      };
      alertControllerSpy.create.and.returnValue(
        Promise.resolve(fakeAlert as any)
      );

      // Act: Call confirmDelete and wait for it to complete.
      const role = await component.confirmDelete('456');
      fixture.detectChanges();

      // Assert: Check that the alert was created and the service's deleteProduct was called.
      expect(alertControllerSpy.create).toHaveBeenCalled();
      //expect(role).toBe('confirm');
      expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('456');
    });

    it('should not call deleteProduct when user cancels deletion', async () => {
      // Arrange: Create a fake alert object that simulates user canceling deletion.
      const fakeAlert = {
        present: () => Promise.resolve(),
        onDidDismiss: () => Promise.resolve({ role: 'cancel' }),
      };
      alertControllerSpy.create.and.returnValue(
        Promise.resolve(fakeAlert as any)
      );

      // Act: Call confirmDelete and wait for it to complete.
      const role = await component.confirmDelete('456');
      fixture.detectChanges();

      // Assert: Check that the alert was created but deleteProduct was not called.
      expect(alertControllerSpy.create).toHaveBeenCalled();
      //expect(role).toBe('cancel');
      expect(productServiceSpy.deleteProduct).not.toHaveBeenCalled();
    });

    // Toggle Buttons
    it('should call toggleBought when the toggle bought button is clicked', async () => {
      const fakeProduct: Product = {
        id: '789',
        name: 'Product 2',
        description: 'Desc',
        price: 30,
        favorite: false,
        bought: false,
      };
      productServiceSpy.getProducts.and.returnValue(() => [fakeProduct]);
      component.products = productServiceSpy.getProducts();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      // ACT
      const toggleBoughtButton: HTMLElement =
        fixture.nativeElement.querySelector('#toggle-bought-btn-789');
      console.log('Toggle Bought Button:', toggleBoughtButton);
      expect(toggleBoughtButton).toBeTruthy();

      toggleBoughtButton.click();
      fixture.detectChanges();

      // ASSERT
      expect(productServiceSpy.updateProduct).toHaveBeenCalledWith('789', {
        bought: true,
      });
    });

    it('should call toggleFavorite when the toggle favorite button is clicked', async () => {
      // Arrange: Provide a fake product in the list.
      const fakeProduct: Product = {
        id: '789',
        name: 'Product 2',
        description: 'Desc',
        price: 30,
        favorite: false,
        bought: false,
      };

      // Override getProducts() to return the fake product.
      productServiceSpy.getProducts.and.returnValue(() => [fakeProduct]);
      // Update the component’s products property.
      component.products = productServiceSpy.getProducts();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      // Act: Query for the toggle-favorite button using the conditional id.
      const toggleFavoriteButton: HTMLElement =
        fixture.nativeElement.querySelector('#toggle-favorite-btn-789');
      console.log('Toggle Favorite Button:', toggleFavoriteButton);
      expect(toggleFavoriteButton).toBeTruthy();

      // Simulate a click on the toggle-favorite button.
      toggleFavoriteButton.click();
      fixture.detectChanges();

      // Assert: Verify that updateProduct was called with the toggled "favorite" status.
      expect(productServiceSpy.updateProduct).toHaveBeenCalledWith('789', {
        favorite: true,
      });
    });

    // Cancel update button for better UX
    it('should reset the form when the cancel button is clicked', () => {
      component.editingProduct = {
        id: '321',
        name: 'Edit Product',
        description: 'Edit Desc',
        price: 50,
        favorite: false,
        bought: false,
      };
      component.productForm.setValue({
        name: 'Edit Product',
        description: 'Edit Desc',
        price: 50,
      });
      fixture.detectChanges();

      const cancelButtonDe = fixture.debugElement.query(By.css('#cancel-btn'));
      console.log('cancelButtonDe:', cancelButtonDe);

      expect(cancelButtonDe).toBeTruthy();

      cancelButtonDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.editingProduct).toBeNull();
      expect(component.productForm.value.name).toBeNull();
      expect(component.productForm.value.description).toBeNull();
      expect(component.productForm.value.price).toBeNull();
    });
  });
});

//act as a senior developer and review my html, ts and test file components to
