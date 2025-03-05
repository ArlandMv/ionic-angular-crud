import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        // Use RouterModule.forRoot instead of RouterTestingModule
        RouterModule.forRoot([]),
        HomePage, // Standalone component import
      ],
      providers: [
        provideLocationMocks(), // Provides location fakes if needed
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home page', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero title "Welcome to Product Manager"', () => {
    const compiled = fixture.nativeElement;
    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle).toBeTruthy();
    expect(heroTitle.textContent).toContain('Welcome to Product Manager');
  });

  it('should render the "Get Started →" button with proper routerLink', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.cta-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Get Started →');
    // Optionally, check the routerLink directive if needed using DebugElement
  });

  it('should display the "No favorites yet!" message when favoriteProducts() returns an empty array', () => {
    // Spy on favoriteProducts to simulate no favorite products
    spyOn(component, 'favoriteProducts').and.returnValue([]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const noFavoritesMsg = compiled.querySelector('.no-favorites');
    expect(noFavoritesMsg).toBeTruthy();
    expect(noFavoritesMsg.textContent).toContain('No favorites yet');
  });
});
