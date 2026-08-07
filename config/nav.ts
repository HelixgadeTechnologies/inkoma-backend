export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
}

export const marketingNav: NavItem[] = [
  { title: "Explore Tales", href: "/explore" },
  { title: "Creator Studio", href: "/studio" },
  { title: "Community Lore", href: "/community" },
  { title: "About Oral Heritage", href: "/about" },
  { title: "Pricing & Guilds", href: "/pricing" },
];

export const platformSidebarNav: NavItem[] = [
  { title: "Discover & Explore", href: "/explore", icon: "Compass" },
  { title: "Storyteller Studio", href: "/studio", icon: "Feather", badge: "Creator" },
  { title: "Lore Community", href: "/community", icon: "Users" },
  { title: "My Griot Profile", href: "/profile/anansi_apprentice", icon: "User" },
];
