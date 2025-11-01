import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNotifications, mockRecalls } from "@/data/mockData";
import { Send, Mail, MessageSquare, Bell, TrendingUp, AlertCircle } from "lucide-react";

const Notify = () => {
  const totalSent = mockNotifications.reduce((acc, n) => acc + n.sent, 0);
  const totalDelivered = mockNotifications.reduce((acc, n) => acc + n.delivered, 0);
  const totalFailed = mockNotifications.reduce((acc, n) => acc + n.failed, 0);
  const avgAckRate = Math.round(
    mockNotifications.reduce((acc, n) => acc + n.ackPercent, 0) /
      mockNotifications.length
  );

  const stats = [
    {
      label: "Total Sent",
      value: totalSent.toLocaleString(),
      icon: Send,
      color: "text-primary",
    },
    {
      label: "Delivered",
      value: totalDelivered.toLocaleString(),
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Failed",
      value: totalFailed.toLocaleString(),
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      label: "Avg Ack Rate",
      value: `${avgAckRate}%`,
      icon: Bell,
      color: "text-info",
    },
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="h-5 w-5" />;
      case "SMS":
        return <MessageSquare className="h-5 w-5" />;
      case "In-App":
        return <Bell className="h-5 w-5" />;
      default:
        return <Send className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="QA Lead" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Notification Manager
          </h2>
          <p className="text-muted-foreground">
            Send multi-channel notifications and track delivery analytics
          </p>
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
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Create New Notification */}
        <Card className="p-6 mb-8 animate-fade-in bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                Create New Notification Campaign
              </h3>
              <p className="text-sm text-muted-foreground">
                Select recall, segment recipients, and send multi-channel alerts
              </p>
            </div>
            <Button className="w-full md:w-auto">
              <Send className="h-4 w-4 mr-2" />
              Start Wizard
            </Button>
          </div>
        </Card>

        {/* Notification History */}
        <div className="space-y-6">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Recent Campaigns
          </h3>

          {mockNotifications.map((notification, index) => {
            const recall = mockRecalls.find((r) => r.id === notification.recallId);
            const deliveryRate = (
              (notification.delivered / notification.sent) *
              100
            ).toFixed(1);

            return (
              <Card
                key={notification.id}
                className="p-6 hover:shadow-medium transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {getChannelIcon(notification.channel)}
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">
                          {notification.channel} Campaign
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {notification.id} • {recall?.product}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Sent</p>
                        <p className="font-semibold text-foreground">
                          {notification.sent.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Delivered</p>
                        <p className="font-semibold text-success">
                          {notification.delivered.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Failed</p>
                        <p className="font-semibold text-destructive">
                          {notification.failed.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Ack Rate</p>
                        <p className="font-semibold text-foreground">
                          {notification.ackPercent}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-success h-full transition-smooth"
                          style={{ width: `${deliveryRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {deliveryRate}% delivered
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Resend Failed
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Notify;
