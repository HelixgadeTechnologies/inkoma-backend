export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
}

export const marketingNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Explore", href: "/explore" },
  { title: "Library", href: "/library" },
  { title: "Studio", href: "/studio" },
  { title: "Profile", href: "/profile" },
];

export const platformSidebarNav: NavItem[] = [
  { title: "Home", href: "/", icon: "Home" },
  { title: "Explore", href: "/explore", icon: "Compass" },
  { title: "Library", href: "/library", icon: "BookOpen" },
  { title: "Studio", href: "/studio", icon: "Feather" },
  { title: "Profile", href: "/profile", icon: "User" },
  { title: "Support INKOMA", href: "/support", icon: "HelpCircle" },
];
