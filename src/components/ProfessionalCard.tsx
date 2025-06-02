
import { useState } from "react";
import { Heart, MapPin, Star, MessageSquare, Eye, Users, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Offering {
  type: string;
  name: string;
  varieties: {
    varietyName: string;
    cost: number;
  }[];
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
}

interface ProfessionalCardProps {
  professional: Professional;
}

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleMessage = () => {
    // Navigate to chat with this professional
    navigate("/chat", { state: { selectedUser: professional.id } });
  };

  const handleViewProfile = () => {
    navigate(`/profiles/${professional.id}`);
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

  const totalVarieties = professional.offerings.reduce(
    (acc, offering) => acc + offering.varieties.length,
    0
  );

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={professional.avatar} />
                <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                  {professional.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                  {professional.name}
                </h3>
                <Badge className={`text-xs ${getProfessionColor(professional.profession)}`}>
                  {professional.profession}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`${
                isFollowing ? "text-red-500" : "text-gray-400"
              } hover:text-red-500`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <Heart className={`h-5 w-5 ${isFollowing ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{professional.followers} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{totalVarieties} varieties</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{professional.location}</span>
          </div>

          {/* Sample Offerings */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Sample Offerings:</h4>
            <div className="space-y-1">
              {professional.offerings.slice(0, 2).map((offering, index) => (
                <div key={index} className="text-xs text-gray-600">
                  <span className="font-medium capitalize">{offering.type}</span>: {offering.name} 
                  <span className="text-green-600"> (₹{offering.varieties[0]?.cost}/unit)</span>
                </div>
              ))}
              {professional.offerings.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{professional.offerings.length - 2} more offerings
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{professional.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{professional.email}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
              onClick={handleMessage}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleViewProfile}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalCard;
