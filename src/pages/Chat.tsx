
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Messages</h1>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
