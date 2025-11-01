import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

interface NavbarProps {
  role?: string;
}

const Navbar = ({ role }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRoleIcon = (roleName?: string) => {
    const icons: Record<string, string> = {
      "QA Lead": "🧪",
      "Compliance Officer": "📢",
      "Support Specialist": "🧰",
      "Retailer": "🧴",
      "Customer": "💁"
    };
    return icons[roleName || ""] || "👤";
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-heading font-bold text-foreground">
                GlowVeda
              </h1>
            </div>
            {!isHomePage && (
              <div className="hidden sm:block text-muted-foreground">
                <span className="mx-2">|</span>
                <span className="text-sm">Recall Management System</span>
              </div>
            )}
          </div>

          {role && !isHomePage && (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
                <span className="text-lg">{getRoleIcon(role)}</span>
                <span className="text-sm font-medium text-foreground">{role}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="transition-smooth"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Switch Role
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
