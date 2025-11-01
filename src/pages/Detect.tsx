import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { mockRecalls } from "@/data/mockData";
import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  AlertTriangle,
  Calendar,
  MapPin,
  Package,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Detect = () => {
  const [recalls] = useState(mockRecalls);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRecalls = recalls.filter((recall) => {
    const matchesSearch =
      recall.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recall.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recall.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || recall.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Active Recalls",
      value: recalls.filter((r) => r.status === "Active").length,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "In Progress",
      value: recalls.filter((r) => r.status === "In Progress").length,
      icon: Package,
      color: "text-warning",
    },
    {
      label: "Closed",
      value: recalls.filter((r) => r.status === "Closed").length,
      icon: ChevronRight,
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="QA Lead" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            QA Dashboard
          </h2>
          <p className="text-muted-foreground">
            Detect contamination, create recalls, and monitor detection progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 transition-smooth hover:shadow-medium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product, batch, or recall ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Recall
            </Button>
          </div>
        </Card>

        {/* Recalls List */}
        <div className="space-y-4 animate-fade-in">
          {filteredRecalls.map((recall, index) => (
            <Card
              key={recall.id}
              className="p-6 hover:shadow-medium transition-smooth cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                        {recall.product}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Recall ID: {recall.id}
                      </p>
                    </div>
                    <StatusBadge status={recall.status} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>Batch: {recall.batch}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{recall.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(recall.detectionDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-foreground">
                      {recall.contaminationType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Manage
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecalls.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              No recalls found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Detect;
