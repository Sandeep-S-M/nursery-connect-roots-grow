
import { useState } from "react";
import { Search, MapPin, TrendingUp, Star, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import WeatherDisplay from "@/components/WeatherDisplay";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  const trendingProducts = [
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
      name: "Lemon Tree Saplings",
      price: "₹150/plant",
      image: "/placeholder.svg",
      seller: "Farmers Choice",
      rating: 4.6,
      location: "Nagpur, Maharashtra",
      inStock: 45
    },
    {
      id: 3,
      name: "Chilli Plant",
      price: "₹20/plant",
      image: "/placeholder.svg",
      seller: "Organic Nursery Hub",
      rating: 4.9,
      location: "Hyderabad, Telangana",
      inStock: 180
    }
  ];

  const handleVoiceSearch = () => {
    setIsVoiceSearch(true);
    // Voice search implementation will be added with the voice assistant
    setTimeout(() => setIsVoiceSearch(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            NurseryConnect
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Connecting Farmers, Nurseries & Home Gardeners Across India
          </p>
          
          {/* Search Bar with Voice */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for plants, seeds, or nurseries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg border-2 border-green-200 focus:border-green-500"
                />
              </div>
              <Button
                onClick={handleVoiceSearch}
                className={`px-6 py-6 ${isVoiceSearch ? 'bg-red-500 animate-pulse' : 'bg-green-600'} hover:bg-green-700`}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Weather Display */}
        <div className="mb-8">
          <WeatherDisplay />
        </div>

        {/* Regional Banner */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Your Region: Maharashtra</span>
            </div>
            <p className="text-green-100">
              🌱 Monsoon Season Special: 20% off on vegetable seedlings | Best time to plant tomatoes and peppers
            </p>
          </CardContent>
        </Card>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { name: "Vegetable Seedlings", icon: "🥬", count: "2,450+" },
            { name: "Fruit Trees", icon: "🌳", count: "1,200+" },
            { name: "Flower Plants", icon: "🌸", count: "3,100+" },
            { name: "Herbs & Spices", icon: "🌿", count: "890+" }
          ].map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-green-800">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Products */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">Trending in Your Area</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Market Insights */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹18-25</div>
                <div className="text-sm text-gray-600">Tomato seedlings avg. price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+15%</div>
                <div className="text-sm text-gray-600">Demand increase this week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">240+</div>
                <div className="text-sm text-gray-600">Active sellers nearby</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
