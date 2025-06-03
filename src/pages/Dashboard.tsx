import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Package, Users, Sprout, Settings } from "lucide-react";
import { useState } from "react";
import PlantOfferingManager from "@/components/PlantOfferingManager";

const Dashboard = () => {
  const [showOfferingManager, setShowOfferingManager] = useState(false);
  
  // Mock user data - in real app this would come from authentication context
  const user = {
    profession: "Nursery Owner", // This would determine if offering manager is shown
    name: "John Doe"
  };

  const isProfessional = ["Nursery Owner", "Gardener", "Home Gardener"].includes(user.profession);

  if (showOfferingManager) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowOfferingManager(false)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <PlantOfferingManager />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
        </div>

        {/* Professional CTA Banner */}
        {isProfessional && (
          <Card className="mb-8 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800">Set Up Your Nursery Offerings</CardTitle>
                    <p className="text-green-700 mt-1">
                      As a {user.profession}, you can showcase your plants, varieties, and pricing to potential customers.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowOfferingManager(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Offerings
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}
        
        {/* Existing Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Inquiries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+15% response rate</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Advanced analytics, order management, and seller tools are available here.
              {isProfessional && " Use the 'Manage Offerings' button above to set up your plant inventory."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
