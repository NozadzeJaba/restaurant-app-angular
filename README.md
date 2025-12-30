# Restaurant App Angular 🍽️

Angular-based restaurant application with product browsing, filtering, and shopping basket functionality.

## 🚀 Features

- Product browsing with categories
- Advanced filtering (vegetarian, nuts, spiciness)
- Shopping basket management
- Responsive design
- Modern UI with smooth animations

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## 📦 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `restaurant-app-angular`)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### Step 2: Push to GitHub

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

#### Option A: Using Angular CLI (Recommended)

```bash
# Install angular-cli-ghpages if not already installed
npm install -g angular-cli-ghpages

# Build and deploy (replace REPO_NAME with your repository name)
ng build --configuration production --base-href /REPO_NAME/
npx angular-cli-ghpages --dir=dist/restaurant-app-angular/browser
```

**Important:** Replace `REPO_NAME` with your actual repository name.

#### Option B: Using GitHub Actions (Automatic)

1. The `.github/workflows/deploy.yml` file is already created
2. Push to GitHub
3. Go to repository Settings → Pages
4. Select "GitHub Actions" as source
5. Every push to `main` branch will automatically deploy

### Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

## 🔧 Configuration

### API Endpoint

The app uses the following API base URL:
```
https://restaurant.stepprojects.ge/api/
```

To change the API endpoint, update the `BASE_URL` in:
- `src/app/services/product.service.ts`
- `src/app/services/basket.service.ts`

## 📝 Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

## 🧪 Testing

### Unit Tests

```bash
ng test
```

### End-to-End Tests

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📚 Additional Resources

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev)
- [GitHub Pages Documentation](https://docs.github.com/pages)
