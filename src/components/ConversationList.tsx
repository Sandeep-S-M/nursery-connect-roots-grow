
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice';
  timestamp: Date;
  read: boolean;
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

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}) => {
  const formatLastMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const truncateMessage = (content: string, maxLength: number = 50) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {conversations.length > 0 ? (
            <div className="space-y-2 p-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedConversation === conversation.id
                      ? 'bg-green-50 border-green-200'
                      : 'hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">
                          {conversation.participant.name}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatLastMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="text-xs w-fit">
                            {conversation.participant.role}
                          </Badge>
                          {conversation.lastMessage && (
                            <p className="text-xs text-gray-600">
                              {conversation.lastMessage.senderId === 'currentUser' && 'You: '}
                              {conversation.lastMessage.type === 'image' ? '📷 Photo' :
                               conversation.lastMessage.type === 'file' ? '📎 File' :
                               truncateMessage(conversation.lastMessage.content)}
                            </p>
                          )}
                        </div>
                        
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-green-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium mb-2">No conversations yet</p>
              <p className="text-xs text-gray-400">
                Start browsing the marketplace to connect with sellers
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
