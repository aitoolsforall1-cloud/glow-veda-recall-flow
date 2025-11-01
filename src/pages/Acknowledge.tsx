import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockRecalls } from "@/data/mockData";
import { Search, CheckCircle, AlertTriangle, Package, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

const Acknowledge = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "customer";
  const [batchNumber, setBatchNumber] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleBatchSearch = () => {
    if (!batchNumber.trim()) {
      toast.error("Please enter a batch number");
      return;
    }

    const affectedRecall = mockRecalls.find(
      (recall) =>
        recall.batch.toLowerCase() === batchNumber.toLowerCase() &&
        recall.status !== "Closed"
    );

    setSearchResult(affectedRecall || { notAffected: true });
  };

  const handleAction = (action: string) => {
    toast.success(`${action} request submitted successfully`, {
      description: "Our team will process your request within 24 hours",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar role={role === "retailer" ? "Retailer" : "Customer"} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <ShieldAlert className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Check Your Product
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {role === "retailer"
              ? "Verify if your inventory is affected by any active recalls"
              : "Find out if your product is part of an active recall"}
          </p>
        </div>

        {/* Search Card */}
        <Card className="p-8 mb-8 shadow-medium animate-slide-up">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter Batch Number
              </label>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g., GV-HS-2201"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleBatchSearch()}
                  className="flex-1"
                />
                <Button onClick={handleBatchSearch} className="px-8">
                  <Search className="h-4 w-4 mr-2" />
                  Check
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Find the batch number on the bottom of your product packaging
              </p>
            </div>

            {/* Alternative Options */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">
                Can't find your batch number?
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Scan QR Code
                </Button>
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card
            className={`p-8 animate-scale-in ${
              searchResult.notAffected
                ? "bg-success/5 border-success/20"
                : "bg-destructive/5 border-destructive/20"
            }`}
          >
            {searchResult.notAffected ? (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-success mx-auto" />
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Good News!
                  </h3>
                  <p className="text-muted-foreground">
                    Your product is not affected by any active recalls
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-12 w-12 text-destructive flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                      Product Affected
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      This batch is part of an active recall. Please stop using this
                      product immediately.
                    </p>

                    <div className="bg-card p-4 rounded-lg space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Product:</span>
                        <span className="font-medium text-foreground">
                          {searchResult.product}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Batch:</span>
                        <span className="font-medium text-foreground">
                          {searchResult.batch}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Reason:</span>
                        <span className="font-medium text-foreground">
                          {searchResult.contaminationType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Recall ID:</span>
                        <span className="font-medium text-foreground">
                          {searchResult.id}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-foreground mb-3">
                        Choose an option:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          onClick={() => handleAction("Refund")}
                          className="w-full"
                        >
                          Request Refund
                        </Button>
                        <Button
                          onClick={() => handleAction("Replacement")}
                          variant="outline"
                          className="w-full"
                        >
                          Request Replacement
                        </Button>
                      </div>
                      {role === "retailer" && (
                        <Button
                          onClick={() => handleAction("Bulk Return")}
                          variant="secondary"
                          className="w-full"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Process Bulk Return
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Information Card */}
        <Card className="p-6 mt-8 bg-accent/5 border-accent/20 animate-fade-in">
          <h3 className="font-heading font-semibold text-foreground mb-3">
            Your Safety is Our Priority
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>Full refund or replacement available for affected products</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>No receipt required for recalled items</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span>
                {role === "retailer"
                  ? "Free return shipping for bulk inventory"
                  : "Free return shipping or in-store return"}
              </span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Acknowledge;
