// Animation constants
export const animations = {
  fadeIn: "animate-fadeIn",
  slideIn: "animate-slideIn",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  transition: "transition-all duration-300 ease-in-out",
  hover: "hover:scale-105 transition-transform duration-200",
};

// Layout styles
export const layoutStyles = {
  page: "min-h-screen bg-gradient-to-b from-background to-background/95 animate-fadeIn",
  container: "container mx-auto px-4 py-8",
  section: "bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
};

// Card styles
export const cardStyles = {
  base: "bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
  header: "p-4 bg-primary/10",
  title: "text-xl font-semibold text-primary",
  content: "p-6",
  footer: "px-6 py-4 bg-muted/10 border-t border-border",
  hover: "hover:scale-105 transition-transform duration-200",
};

// Button variations
export const buttonStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

// Form styles
export const formStyles = {
  container: "space-y-6",
  group: "space-y-2",
  label: "text-sm font-medium text-foreground/70",
  input: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  error: "text-sm text-destructive mt-1",
};

// Navigation styles
export const navStyles = {
  nav: "bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50",
  container: "container mx-auto px-4",
  header: "flex h-16 items-center justify-between",
  
  // Logo section
  logoContainer: "flex items-center space-x-2 hover:scale-105 transition-transform duration-200",
  logoImage: "h-8 w-auto",
  logoText: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70",
  
  // Desktop navigation
  desktopNav: "hidden md:flex items-center space-x-4",
  navLink: "flex items-center space-x-1 text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-accent/10 transition-colors duration-200",
  navIcon: "h-5 w-5",
  
  // Auth buttons
  authContainer: "hidden md:flex items-center space-x-4",
  
  // Mobile menu button
  mobileMenuBtn: "flex md:hidden",
  mobileMenuTrigger: "inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors duration-200",
  mobileIcon: "block h-6 w-6",
  
  // Mobile menu
  mobileMenu: {
    container: "px-2 pt-2 pb-3 space-y-1 animate-slideDown",
    link: "flex items-center space-x-2 text-foreground/80 hover:text-foreground hover:bg-accent/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
    authSection: "pt-4 pb-3 border-t border-border",
    authContainer: "px-2 space-y-1",
    authButton: "w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors duration-200",
    authLink: "block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors duration-200"
  }
}; 