
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Clock } from "lucide-react";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Chat functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Select a conversation
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-gray-500">Real-time chat interface will be implemented here</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
