'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'konkani' | 'marathi';

interface LanguageDropdownProps {
  onLanguageChange?: (lang: Language) => void;
  currentLanguage?: Language;
}

export function LanguageDropdown({ 
  onLanguageChange, 
  currentLanguage = 'en' 
}: LanguageDropdownProps) {
  const [language, setLanguage] = useState<Language>(currentLanguage);

  const languages: Record<Language, string> = {
    en: 'English',
    konkani: 'Konkani',
    marathi: 'Marathi',
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    onLanguageChange?.(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{languages[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={language === code ? 'bg-primary/10' : ''}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
