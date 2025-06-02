
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Download, Volume2 } from 'lucide-react';

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

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.lang = 'hi-IN'; // Default to Hindi, could be made configurable
      speechSynthesis.speak(utterance);
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={message.fileUrl || '/placeholder.svg'} 
              alt="Shared image"
              className="rounded-lg w-full h-auto"
            />
            {message.content && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg max-w-xs">
            <div className="flex-1">
              <p className="font-medium text-sm">{message.fileName || 'Document'}</p>
              <p className="text-xs text-gray-500">File attachment</p>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg max-w-xs">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Volume2 className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <p className="text-sm font-medium">Voice message</p>
              <p className="text-xs text-gray-500">0:15</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="group">
            <p className="text-sm">{message.content}</p>
            {message.content.length > 20 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReadAloud}
                className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Read aloud
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8 mt-auto">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {renderMessageContent()}
        </div>
        
        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span className={message.read ? 'text-green-600' : 'text-gray-400'}>
              {message.read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
