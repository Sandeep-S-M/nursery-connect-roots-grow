import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MapPin, MessageSquare, Phone, Mail, Users, Plus, Minus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Navigation from "@/components/Navigation";

interface Variety {
  varietyName: string;
  cost: number;
  quantity?: number;
}

interface Offering {
  type: string;
  name: string;
  varieties: Variety[];
}

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}

interface Professional {
  id: number;
  name: string;
  profession: string;
  avatar: string;
  location: string;
  phone: string;
  email: string;
  followers: number;
  offerings: Offering[];
  salesData: SalesData[];
}

const ProfileDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  // Mock sales data for the past 6 months
  const mockSalesData: SalesData[] = [
    { month: "Jan", revenue: 45000, orders: 23 },
    { month: "Feb", revenue: 52000, orders: 28 },
    { month: "Mar", revenue: 38000, orders: 19 },
    { month: "Apr", revenue: 61000, orders: 34 },
    { month: "May", revenue: 55000, orders: 31 },
    { month: "Jun", revenue: 67000, orders: 38 }
  ];

  // Mock data - in real app, fetch from API based on userId
  const professional: Professional = {
    id: 1,
    name: "Rajesh Kumar",
    profession: "Nursery Owner",
    avatar: "/placeholder.svg",
    location: "Pune, Maharashtra",
    phone: "+91 98765 43210",
    email: "rajesh@greennursery.com",
    followers: 245,
    salesData: mockSalesData,
    offerings: [
      {
        type: "plant",
        name: "Tomato",
        varieties: [
          { varietyName: "Yamarold", cost: 20 },
          { varietyName: "Gulabi", cost: 25 },
          { varietyName: "Cherry", cost: 30 }
        ]
      },
      {
        type: "plant",
        name: "Grapes",
        varieties: [
          { varietyName: "Sharad Seedless", cost: 60 },
          { varietyName: "Thompson Seedless", cost: 65 }
        ]
      },
      {
        type: "herb",
        name: "Basil",
        varieties: [
          { varietyName: "Sweet Basil", cost: 15 },
          { varietyName: "Thai Basil", cost: 18 }
        ]
      }
    ]
  };

  const chartConfig = {
    revenue: {
      label: "Revenue (₹)",
      color: "#16a34a",
    },
    orders: {
      label: "Orders",
      color: "#059669",
    },
  };

  const handleMessage = () => {
    navigate("/chat", { state: { selectedUser: professional.id } });
  };

  const updateQuantity = (varietyKey: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [varietyKey]: Math.max(0, (prev[varietyKey] || 0) + change)
    }));
  };

  const getVarietyKey = (offeringName: string, varietyName: string) => {
    return `${offeringName}-${varietyName}`;
  };

  const getTotalCost = () => {
    let total = 0;
    professional.offerings.forEach(offering => {
      offering.varieties.forEach(variety => {
        const key = getVarietyKey(offering.name, variety.varietyName);
        const quantity = quantities[key] || 0;
        total += quantity * variety.cost;
      });
    });
    return total;
  };

  const getProfessionColor = (profession: string) => {
    switch (profession) {
      case "Nursery Owner":
        return "bg-green-100 text-green-800";
      case "Gardener":
        return "bg-blue-100 text-blue-800";
      case "Home Gardener":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={professional.avatar} />
                <AvatarFallback className="bg-green-100 text-green-600 font-semibold text-2xl">
                  {professional.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{professional.name}</h1>
                    <Badge className={`mb-3 ${getProfessionColor(professional.profession)}`}>
                      {professional.profession}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing ? "text-red-600 border-red-200" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleMessage}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="h-4 w-4" />
                    <span>{professional.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span>{professional.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Users className="h-4 w-4" />
                    <span>{professional.followers} followers</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance Graph */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Performance (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={professional.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue (₹)" />
              </BarChart>
            </ChartContainer>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{professional.salesData.reduce((sum, data) => sum + data.revenue, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {professional.salesData.reduce((sum, data) => sum + data.orders, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{Math.round(professional.salesData.reduce((sum, data) => sum + data.revenue, 0) / professional.salesData.reduce((sum, data) => sum + data.orders, 0)).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Avg Order Value</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(professional.salesData.reduce((sum, data) => sum + data.orders, 0) / 6)}
                </div>
                <div className="text-sm text-gray-600">Avg Orders/Month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offerings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Available Offerings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {professional.offerings.map((offering, offeringIndex) => (
                <div key={offeringIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="capitalize">
                      {offering.type}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900">{offering.name}</h3>
                  </div>
                  
                  <div className="grid gap-4">
                    {offering.varieties.map((variety, varietyIndex) => {
                      const varietyKey = getVarietyKey(offering.name, variety.varietyName);
                      const currentQuantity = quantities[varietyKey] || 0;
                      
                      return (
                        <div key={varietyIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{variety.varietyName}</h4>
                            <p className="text-green-600 font-semibold">₹{variety.cost}/plant</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(varietyKey, -1)}
                                disabled={currentQuantity === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={currentQuantity}
                                onChange={(e) => setQuantities(prev => ({
                                  ...prev,
                                  [varietyKey]: Math.max(0, parseInt(e.target.value) || 0)
                                }))}
                                className="w-20 text-center"
                                min="0"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(varietyKey, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {currentQuantity > 0 && (
                              <div className="text-sm text-gray-600">
                                Total: ₹{currentQuantity * variety.cost}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            {getTotalCost() > 0 && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800">Order Summary</h3>
                  <div className="text-2xl font-bold text-green-600">₹{getTotalCost()}</div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Order Now
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetail;
