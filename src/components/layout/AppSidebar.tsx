import { LayoutDashboard, FileText, Users, Phone } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Results", url: "/results", icon: FileText },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Contact Lab", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  return (
    <aside className="flex w-56 flex-col border-r border-border bg-sidebar">
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>

        ))}
      </nav>
      <footer><p className="text-xs text-muted-foreground">Labman 3 version 3</p></footer>
    </aside>
  );
}
