# Pokemon Team Builder

A modern web application for creating and managing Pokemon teams. Showcasing modern web development practices and clean architecture.


## Features

- 🔐 **User Authentication**: Secure login and registration with Firebase
- 🌐 **Internationalization**: Full support for multiple languages (English/Spanish)
- 📱 **Responsive Design**: Seamless experience across all devices
- ⚡ **Real-time Updates**: Instant team updates and collaboration
- 🎨 **Modern UI**: Clean and intuitive interface with smooth animations
- 🔍 **Advanced Search**: Find Pokemon by name, type, and stats
- 💾 **Persistent Storage**: Teams are saved and synced across devices
- 🌙 **Dark / Light Mode**: Full theme support for better user experience

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Context API with custom hooks
- **Styling**: TailwindCSS with custom components
- **Validation**: Zod for runtime type checking and validation
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **API Integration**: PokeAPI
- **Routing**: React Router v6
- **Internationalization**: i18next
- **Icons**: Heroicons
- **Testing**: Jest and React Testing Library for comprehensive unit testing
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pabloscode23/FullStackSystem.git
cd client
```

2. Install all dependencies
```bash
# Install all dependencies listed in package.json
npm install

# If you encounter peer dependency errors, you can force the installation
npm install --legacy-peer-deps

# If the error persists, try
npm install --force
```

3. Install necessary development dependencies if they weren't installed correctly
```bash
# Testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest jest-environment-jsdom @vitejs/plugin-react

# TypeScript types
npm install --save-dev @types/react @types/react-dom @types/node

# Development tools
npm install --save-dev postcss autoprefixer
```

4. Configure TailwindCSS (if configuration doesn't exist)
```bash
npx tailwindcss init -p
```

5. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

6. Verify the installation
```bash
# Verify that all dependencies are installed correctly
npm ls

# If you encounter TypeScript errors, run
npm run type-check # (ensure this script exists in package.json)
```

7. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```


### Troubleshooting Common Installation Issues

#### Node Version Mismatch
If you encounter Node version-related errors, ensure you're using the correct version:
```bash
# Install nvm (Node Version Manager) if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Use the correct Node version
nvm install 16
nvm use 16
```

#### Dependency Errors
If you encounter dependency errors after installation:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### TypeScript Errors
If you encounter type errors:
```bash
# Regenerate type declaration files
npm run build:types # (ensure this script exists in package.json)

# Or manually install missing types
npm install --save-dev @types/[package-name]
```

## Development Notes

This project served as a learning experience for implementing several modern web development tools and practices. While the core architecture and business logic were developed traditionally, AI tools were leveraged as learning aids to:

- Accelerate the learning curve for Firebase implementation
- Improve test coverage by understanding Jest best practices
- Enhance code quality through static analysis suggestions

This approach allowed for faster skill acquisition while maintaining code quality and architectural integrity.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for the Pokemon data
- [Firebase](https://firebase.google.com/) for authentication and database services
- [TailwindCSS](https://tailwindcss.com/) for the styling system
- The developer community for their invaluable resources and documentation