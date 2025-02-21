# Pokemon Team Builder

A modern web application for creating and managing Pokemon teams. Built as a technical assessment showcasing modern web development practices and clean architecture.

![Pokemon Team Builder Screenshot](./docs/screenshot.png)

## Features

- 🔐 **User Authentication**: Secure login and registration with Firebase
- 🌐 **Internationalization**: Full support for multiple languages (English/Spanish)
- 📱 **Responsive Design**: Seamless experience across all devices
- ⚡ **Real-time Updates**: Instant team updates and collaboration
- 🎨 **Modern UI**: Clean and intuitive interface with smooth animations
- 🔍 **Advanced Search**: Find Pokemon by name, type, and stats
- 💾 **Persistent Storage**: Teams are saved and synced across devices
- 🌙 **Dark Mode**: Full theme support for better user experience

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Context API with custom hooks
- **Styling**: TailwindCSS with custom components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **API Integration**: PokeAPI
- **Routing**: React Router v6
- **Internationalization**: i18next
- **Icons**: Heroicons
- **Testing**: Jest and React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pokemon-team-builder.git
cd pokemon-team-builder
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── services/      # API and external service integrations
├── types/         # TypeScript type definitions
├── utils/         # Helper functions and utilities
├── pages/         # Route components
└── i18n/          # Internationalization files
```

## Key Features in Detail

### Team Building
- Create and manage multiple Pokemon teams
- Real-time validation of team composition
- Detailed Pokemon statistics and information
- Type effectiveness calculations

### User Experience
- Smooth animations and transitions
- Intuitive drag-and-drop interface
- Responsive design for all screen sizes
- Accessibility compliance

### Performance
- Optimized image loading
- Efficient state management
- Minimal bundle size
- Lazy loading of components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for the Pokemon data
- [Firebase](https://firebase.google.com/) for authentication and database services
- [TailwindCSS](https://tailwindcss.com/) for the styling system