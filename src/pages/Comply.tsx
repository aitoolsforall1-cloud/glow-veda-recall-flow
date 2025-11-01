import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { mockCompliance, mockRecalls, mockAnalytics } from "@/data/mockData";
import {
  FileText,
  Download,
  TrendingUp,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";

const Comply = () => {
  const stats = [
    {
      label: "Active Recalls",
      value: mockAnalytics.totalActiveRecalls,
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Avg Delivery Rate",
      value: `${mockAnalytics.avgDeliveryRate}%`,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Avg Ack Rate",
      value: `${mockAnalytics.avgAcknowledgmentRate}%`,
      icon: CheckCircle,
      color: "text-info",
    },
    {
      label: "SLA Compliance",
      value: `${mockAnalytics.SLACompliancePercent}%`,
      icon: Clock,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="Compliance Officer" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Compliance Dashboard
              </h2>
              <p className="text-muted-foreground">
                Monitor delivery metrics, acknowledgment rates, and SLA compliance
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 transition-smooth hover:shadow-medium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Immutable Log Badge */}
        <Card className="p-4 mb-8 bg-success/5 border-success/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-foreground">
              Immutable Log Verified • All compliance data is cryptographically secured
            </p>
          </div>
        </Card>

        {/* Compliance Table */}
        <Card className="overflow-hidden animate-scale-in">
          <div className="p-6 bg-muted/30 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recall Compliance Overview
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Recall ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                    Region
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Delivery Rate
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Ack Rate
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    SLA Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockCompliance.map((compliance, index) => {
                  const recall = mockRecalls.find((r) => r.id === compliance.recallId);
                  return (
                    <tr
                      key={compliance.recallId}
                      className="hover:bg-muted/20 transition-smooth"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {compliance.recallId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{recall?.product}</p>
                          <p className="text-sm text-muted-foreground">
                            {recall?.batch}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {recall?.region}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-success">
                            {compliance.deliveryRate}%
                          </span>
                          <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-success h-full"
                              style={{ width: `${compliance.deliveryRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-info">
                            {compliance.ackRate}%
                          </span>
                          <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-info h-full"
                              style={{ width: `${compliance.ackRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={compliance.SLACompliance} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Export Options */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 animate-fade-in">
          <Button variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export as CSV
          </Button>
          <Button variant="outline" className="flex-1">
            <Shield className="h-4 w-4 mr-2" />
            Verify Audit Log
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Comply;
