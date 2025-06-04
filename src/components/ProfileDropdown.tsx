
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, LogOut, MessageSquare } from "lucide-react";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const getInitials = () => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-green-600 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-green-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.emailOrPhone}</p>
              <p className="text-xs text-green-600 font-medium">{user.profession}</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2 h-9">
              <User className="h-4 w-4" />
              View Profile
            </Button>
          </Link>
          
          <Link to="/chat" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2 h-9">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
          </Link>
          
          <Button variant="ghost" className="w-full justify-start gap-2 h-9">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          
          <div className="border-t my-2"></div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
