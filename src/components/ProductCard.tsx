
import { useState } from "react";
import { Heart, MapPin, Star, MessageSquare, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  seller: string;
  rating: number;
  location: string;
  inStock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${
            isFavorited ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 bg-white/80 backdrop-blur-sm`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
        {product.inStock < 50 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Low Stock
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Product Name & Price */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xl font-bold text-green-600">{product.price}</p>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="font-medium">{product.seller}</span>
          </div>

          {/* Location & Stock */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{product.location}</span>
            </div>
            <span className="text-gray-600">{product.inStock} in stock</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
