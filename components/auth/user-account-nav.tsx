"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { LoginModal } from "@/components/auth/login-modal";
import { useState } from "react";

interface UserAccountNavProps {
  mobile?: boolean;
}

export function UserAccountNav({ mobile = false }: UserAccountNavProps) {
  const { user, signOut } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };

  if (!user) {
    return (
      <>
        <div
          onClick={() => setIsLoginModalOpen(true)}
          className={`cursor-pointer hover:opacity-80 ${mobile ? "flex flex-col items-center gap-1 text-gray-400 hover:text-brand-purple transition-colors" : ""}`}
        >
          {mobile ? (
            <>
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                Profile
              </span>
            </>
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    );
  }

  // Get initials or use default
  const initials = user.email?.substring(0, 2).toUpperCase() || "U";

  const TriggerContent = mobile ? (
    <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-purple transition-colors">
      <Avatar className="w-5 h-5">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback className="text-[9px] bg-brand-purple/10 text-brand-purple">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="text-[10px] font-medium uppercase tracking-wider">
        Profile
      </span>
    </div>
  ) : (
    <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
      <AvatarImage src={user.user_metadata?.avatar_url} />
      <AvatarFallback className="bg-brand-purple/10 text-brand-purple font-medium text-xs">
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={handleProfileClick}>
        {/* We wrap in a div or button to avoid hydration mismatches if trigger is complicated, 
             but here the trigger logic is handled by if/else above for login, 
             so this is only for logged in state */}
        <button className="outline-none">{TriggerContent}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 bg-white p-2">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {user.user_metadata?.full_name && (
              <p className="font-medium text-sm text-gray-900">
                {user.user_metadata.full_name}
              </p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-xs text-gray-500">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-gray-900">
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-gray-900">
          Settings
        </DropdownMenuItem> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
          onClick={() => signOut()}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
