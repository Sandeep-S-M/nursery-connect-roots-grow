
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, HelpCircle } from "lucide-react";

const Forum = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Community Forum</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Crop Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Discuss best practices for growing and caring for plants</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Market Discussions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Share market insights and pricing trends</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Get help with platform features and farming questions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forum;
