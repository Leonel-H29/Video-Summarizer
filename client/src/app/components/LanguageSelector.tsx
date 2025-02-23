import { useState } from 'react';
import { LanguageEnum } from '@/app/enum/language.enum';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

export const LanguageSelector = ({
  onLanguageSelect,
}: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const languageOptions = Object.entries(LanguageEnum).map(([key, value]) => ({
    key,
    label: value,
  }));

  const handleLanguageSelect = (key: string) => {
    setSelectedLanguage(key);
    onLanguageSelect(LanguageEnum[key as keyof typeof LanguageEnum]);
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm">Language</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedLanguage
              ? LanguageEnum[selectedLanguage as keyof typeof LanguageEnum]
              : 'Select language...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." className="h-9" />
            <CommandList>
              {languageOptions.map((language) => (
                <CommandItem
                  key={language.key}
                  onSelect={() => handleLanguageSelect(language.key)}
                >
                  <Image
                    src={`/flags/${language.key}.webp`}
                    alt={`${language.label} flag`}
                    className="mr-2 h-6 w-6"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  {language.label}
                  <Check
                    className={
                      selectedLanguage === language.key
                        ? 'opacity-100'
                        : 'opacity-0'
                    }
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
