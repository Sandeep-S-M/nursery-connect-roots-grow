
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Mic, Image, File, MessageCircle } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ConversationList from './ConversationList';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice';
  timestamp: Date;
  read: boolean;
  fileUrl?: string;
  fileName?: string;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: Date;
  };
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

const ChatInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - in real app, this would come from API/Socket.IO
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        id: 'user1',
        name: 'Rajesh Kumar',
        role: 'Nursery Owner',
        avatar: '/placeholder.svg',
        isOnline: true,
      },
      lastMessage: {
        id: 'msg1',
        senderId: 'user1',
        receiverId: 'currentUser',
        content: 'Do you have tomato seedlings available?',
        type: 'text',
        timestamp: new Date(),
        read: false,
      },
      unreadCount: 2,
      updatedAt: new Date(),
    },
    {
      id: '2',
      participant: {
        id: 'user2',
        name: 'Priya Sharma',
        role: 'Farmer',
        avatar: '/placeholder.svg',
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      lastMessage: {
        id: 'msg2',
        senderId: 'currentUser',
        receiverId: 'user2',
        content: 'Thank you for the roses!',
        type: 'text',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: true,
      },
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg1',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'Hello! I saw your listing for tomato seedlings. Do you have them available?',
      type: 'text',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg2',
      senderId: 'currentUser',
      receiverId: 'user1',
      content: 'Yes, I have premium quality tomato seedlings. How many do you need?',
      type: 'text',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg3',
      senderId: 'user1',
      receiverId: 'currentUser',
      content: 'I need about 100 seedlings. Can you share some photos?',
      type: 'text',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: true,
    },
  ]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      receiverId: selectedConv?.participant.id || '',
      content: message,
      type: 'text',
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedConv?.participant.id || '',
        receiverId: 'currentUser',
        content: 'Thanks for your message! Let me check and get back to you.',
        type: 'text',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type: 'image' | 'file') => {
    if (type === 'image') {
      imageInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Voice input would integrate with the existing VoiceAssistant component
    console.log('Voice input toggled');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Conversation List */}
      <div className="lg:col-span-1">
        <ConversationList 
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>
      
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConv.participant.avatar} />
                    <AvatarFallback>{selectedConv.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{selectedConv.participant.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {selectedConv.participant.role}
                      </Badge>
                      {selectedConv.participant.isOnline ? (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Online
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Last seen {selectedConv.participant.lastSeen?.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        isOwn={msg.senderId === 'currentUser'}
                      />
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        {selectedConv.participant.name} is typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFileUpload('image')}
                    className="text-gray-500 hover:text-green-600"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFileUpload('file')}
                    className="text-gray-500 hover:text-green-600"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleVoiceInput}
                    className={`text-gray-500 hover:text-green-600 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Select a conversation</p>
                <p className="text-sm">Choose a conversation from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => console.log('Image selected:', e.target.files?.[0])}
      />
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => console.log('File selected:', e.target.files?.[0])}
      />
    </div>
  );
};

export default ChatInterface;
