import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { mockSupportTickets, mockRecalls } from "@/data/mockData";
import {
  MessageSquare,
  Search,
  Send,
  User,
  Clock,
  Filter,
  Bot,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Report = () => {
  const [selectedTicket, setSelectedTicket] = useState(mockSupportTickets[0]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="Support Specialist" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Support Console
          </h2>
          <p className="text-muted-foreground">
            Manage customer tickets and provide assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <Card className="lg:col-span-1 p-4 animate-fade-in">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {mockSupportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                    selectedTicket?.id === ticket.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {ticket.id}
                    </span>
                    <StatusBadge status={ticket.status} size="sm" />
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {ticket.customer}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {ticket.issue}
                  </p>
                  {ticket.feedback && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg">{ticket.feedback}</span>
                      <span className="text-xs text-muted-foreground">
                        Customer feedback
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Ticket Detail & Chat */}
          <Card className="lg:col-span-2 p-6 animate-slide-up">
            {selectedTicket ? (
              <div className="space-y-6">
                {/* Ticket Header */}
                <div className="pb-6 border-b border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                        {selectedTicket.customer}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ticket: {selectedTicket.id}
                      </p>
                    </div>
                    <StatusBadge status={selectedTicket.status} />
                  </div>

                  {/* Recall Info */}
                  {(() => {
                    const recall = mockRecalls.find(
                      (r) => r.id === selectedTicket.recallId
                    );
                    return (
                      <Card className="p-4 bg-muted/50">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Related Recall
                            </p>
                            <p className="font-medium text-foreground">
                              {selectedTicket.recallId}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Product</p>
                            <p className="font-medium text-foreground">
                              {recall?.product}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Assigned To
                            </p>
                            <p className="font-medium text-foreground">
                              {selectedTicket.assignedAgent}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Priority</p>
                            <p className="font-medium text-warning">Medium</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })()}
                </div>

                {/* Chat Area */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h4 className="font-heading font-semibold text-foreground">
                      Conversation
                    </h4>
                  </div>

                  {/* Customer Message */}
                  <div className="flex gap-3">
                    <div className="p-2 bg-primary/10 rounded-full h-fit">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {selectedTicket.customer}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          2 hours ago
                        </span>
                      </div>
                      <Card className="p-4 bg-muted/50">
                        <p className="text-sm text-foreground">
                          {selectedTicket.issue}
                        </p>
                      </Card>
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="flex gap-3">
                    <div className="p-2 bg-info/10 rounded-full h-fit">
                      <Bot className="h-4 w-4 text-info" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          AI Assistant
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Suggested Response
                        </span>
                      </div>
                      <Card className="p-4 bg-info/5 border-info/20">
                        <p className="text-sm text-foreground">
                          Hi {selectedTicket.customer}, I understand your concern. Your
                          refund is currently being processed and should be completed
                          within 3-5 business days. I'll escalate this to ensure faster
                          processing.
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="pt-6 border-t border-border">
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Type your response..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Use AI Suggestion
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Template
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a ticket to view details
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Report;
