# Product Manager App

[![Angular](https://img.shields.io/badge/Angular-19-%23DD0031)](https://angular.io/)
[![Ionic](https://img.shields.io/badge/Ionic-8-%233880FF)](https://ionicframework.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-%2346C4F3)](https://capacitorjs.com/)

A modern mobile-first CRUD application for product management built with:

- **Ionic 8** (Standalone Components)
- **Angular 19** (Signals)
- **Capacitor 7** (Native Runtime)

<!--![App Screenshot](./screenshots/app-preview.png)-->

## Features

- **Three Main Views**
  - 🏠 Home: Landing page with favorites showcase
  - 📋 Products: Full CRUD operations
  - ℹ️ About: App information
- **Core Functionality**
  - ✅ Create/Read/Update/Delete products
  - ⭐ Favorite tracking system
  - 💰 Price formatting and validation
- **Modern Architecture**
  - Signal-based state management
  - Standalone components
  - In-memory data service
  - Responsive UI

## Installation

### Prerequisites

- Node.js 22+
- npm 11+
- Ionic CLI 7+ 
- Angular CLI 19+

### Setup

```bash
# Clone repository
git clone https://github.com/ArlandMv/ionic-angular-crud.git
cd ionic-angular-crud

# Install dependencies
npm install
npm install -g @ionic/cli

# Start development server
ionic serve
```

## Usage

1. **Navigation**

   - Home Page: `/`
   - Products List: `/list`
   - About Page: `/about`

2. **Product Operations**

   - **Add Product**: Click ➕ button
   - **Edit**: Click ✏️ icon on product card
   - **Delete**: Click 🗑️ icon + confirm
   - **Form Validation**: Required fields enforced

3. **Data Persistence**
   - In-memory storage (resets on page refresh)
   - (TODO: Add persistent storage)

## Development

### Tech Stack

- **UI Framework**: Ionic 8
- **State Management**: Angular Signals
- **Routing**: Angular Router
- **Build System**: Angular CLI

### Commands

```bash
# Serve with hot reload
ionic serve

# Build for production
ionic build

# Run tests
npm test

# Add native platforms
npx cap add android
npx cap add ios
```

### File Structure

```
src/app/
├── pages/            # Application views
│   ├── home/         # Landing page
│   ├── list/         # CRUD operations
│   └── about/        # Info page
├── services/         # Data layer
│   └── product.service.ts
└── app.routes.ts     # Routing configuration
```

## Building for Production

1. Create production build:

```bash
ionic build --prod
```

2. Sync with native platforms:

```bash
npx cap sync
```

3. Open IDE for native development:

```bash
npx cap open android
# or
npx cap open ios
```

## Contributing

1. Create feature branch:

```bash
git checkout -b feature/your-feature
```

2. Commit changes following [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new product category"
```

3. Push to branch and create PR

## License

MIT License - see [LICENSE](LICENSE) for details

---

<!--
**Created with ❤️ by [Your Name]**
[Report Issues](https://github.com/yourusername/ionic8-ng19-capacitor7-demo/issues)

```

To complete your README:

1. Create a `screenshots` directory and add app images
2. Update repository URLs
3. Add your contact information
4. Customize features list as needed

This README provides:
- Clear installation/usage instructions
- Technology badges
- Development workflow details
- Contribution guidelines
- Native build instructions
- Visual hierarchy for easy scanning
```
-->
