import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  TestTube,
  FileCheck,
  Headphones,
  Store,
  UserCircle,
  Sparkles,
} from "lucide-react";

interface RoleCard {
  role: string;
  icon: React.ReactNode;
  description: string;
  path: string;
  color: string;
}

const Index = () => {
  const navigate = useNavigate();

  const roles: RoleCard[] = [
    {
      role: "QA Lead",
      icon: <TestTube className="h-8 w-8" />,
      description: "Detect contamination and create recalls",
      path: "/detect",
      color: "primary",
    },
    {
      role: "Compliance Officer",
      icon: <FileCheck className="h-8 w-8" />,
      description: "Monitor compliance and generate reports",
      path: "/comply",
      color: "secondary",
    },
    {
      role: "Support Specialist",
      icon: <Headphones className="h-8 w-8" />,
      description: "Handle customer support tickets",
      path: "/report",
      color: "accent",
    },
    {
      role: "Retailer",
      icon: <Store className="h-8 w-8" />,
      description: "Acknowledge recalls and manage returns",
      path: "/acknowledge?role=retailer",
      color: "info",
    },
    {
      role: "Customer",
      icon: <UserCircle className="h-8 w-8" />,
      description: "Check product status and request refunds",
      path: "/acknowledge?role=customer",
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            GlowVeda Recall Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multi-role notification and compliance system for product recalls.
            Select your role to access your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((roleCard, index) => (
            <Card
              key={roleCard.role}
              className="p-6 hover:shadow-medium transition-smooth cursor-pointer animate-scale-in bg-card border-2 border-border hover:border-primary"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(roleCard.path)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 bg-${roleCard.color}/10 rounded-2xl text-${roleCard.color}`}>
                  {roleCard.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {roleCard.role}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {roleCard.description}
                  </p>
                </div>
                <Button
                  className="w-full transition-smooth"
                  variant={roleCard.color === "primary" ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(roleCard.path);
                  }}
                >
                  Access Dashboard
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-6 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Demo Mode Active
            </h3>
            <p className="text-sm text-muted-foreground">
              This system operates in demonstration mode. All data is simulated for
              evaluation purposes. No authentication required.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
