'use client';

import { Leaf } from 'lucide-react';
import { LanguageDropdown } from './LanguageDropdown';
import { UserProfile } from './UserProfile';

interface HeaderProps {
  onLanguageChange?: (lang: 'en' | 'konkani' | 'marathi') => void;
  onSignOut?: () => void;
}

export function Header({ onLanguageChange, onSignOut }: HeaderProps) {
  return (
    <header className="w-full bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground hidden sm:block">
            AgriVision
          </h1>
        </div>

        {/* Center - Language Selector */}
        <div className="flex-1 flex justify-center">
          <LanguageDropdown onLanguageChange={onLanguageChange} />
        </div>

        {/* Right - User Profile */}
        <div className="flex items-center">
          <UserProfile onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}
