
import { useState } from "react";
import { Search, Filter, MapPin, Grid, List, MessageSquare, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import ProfessionalCard from "@/components/ProfessionalCard";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"products" | "professionals">("products");

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Tomato Seedlings",
      price: "₹15/plant",
      image: "/placeholder.svg",
      seller: "Green Gardens Nursery",
      rating: 4.8,
      location: "Pune, Maharashtra",
      inStock: 250
    },
    {
      id: 2,
      name: "Rose Plants",
      price: "₹45/plant",
      image: "/placeholder.svg",
      seller: "Flower Paradise",
      rating: 4.6,
      location: "Mumbai, Maharashtra",
      inStock: 150
    },
  ];

  // Mock data for professionals
  const professionals = [
    {
      id: 1,
      name: "Rajesh Kumar",
      profession: "Nursery Owner",
      avatar: "/placeholder.svg",
      location: "Pune, Maharashtra",
      phone: "+91 98765 43210",
      email: "rajesh@greennursery.com",
      followers: 245,
      offerings: [
        {
          type: "plant",
          name: "Tomato",
          varieties: [
            { varietyName: "Yamarold", cost: 20 },
            { varietyName: "Gulabi", cost: 25 }
          ]
        },
        {
          type: "plant",
          name: "Grapes",
          varieties: [
            { varietyName: "Sharad Seedless", cost: 60 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Priya Sharma",
      profession: "Gardener",
      avatar: "/placeholder.svg",
      location: "Mumbai, Maharashtra",
      phone: "+91 87654 32109",
      email: "priya@gardening.com",
      followers: 180,
      offerings: [
        {
          type: "herb",
          name: "Basil",
          varieties: [
            { varietyName: "Sweet Basil", cost: 15 }
          ]
        },
        {
          type: "show plant",
          name: "Hibiscus",
          varieties: [
            { varietyName: "Red", cost: 30 },
            { varietyName: "Yellow", cost: 35 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Amit Patel",
      profession: "Nursery Owner",
      avatar: "/placeholder.svg",
      location: "Ahmedabad, Gujarat",
      phone: "+91 76543 21098",
      email: "amit@greenworld.com",
      followers: 320,
      offerings: [
        {
          type: "seed",
          name: "Marigold",
          varieties: [
            { varietyName: "African Marigold", cost: 5 },
            { varietyName: "French Marigold", cost: 8 }
          ]
        }
      ]
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesProfession = selectedProfession === "all" || prof.profession === selectedProfession;
    const matchesSearch = !searchQuery || 
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.offerings.some(offering => 
        offering.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesProfession && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Marketplace</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={activeTab === "products" ? "default" : "outline"}
              onClick={() => setActiveTab("products")}
              className={activeTab === "products" ? "bg-green-600 text-white" : ""}
            >
              Products
            </Button>
            <Button
              variant={activeTab === "professionals" ? "default" : "outline"}
              onClick={() => setActiveTab("professionals")}
              className={activeTab === "professionals" ? "bg-green-600 text-white" : ""}
            >
              Professionals
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={activeTab === "products" ? "Search plants, seeds, nurseries..." : "Search professionals, offerings..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {activeTab === "professionals" && (
              <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Professions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Professions</SelectItem>
                  <SelectItem value="Nursery Owner">Nursery Owner</SelectItem>
                  <SelectItem value="Gardener">Gardener</SelectItem>
                  <SelectItem value="Home Gardener">Home Gardener</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Button>
            <div className="flex gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {activeTab === "products" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        )}

        {/* No Results */}
        {activeTab === "professionals" && filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No professionals found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
