import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ColorTabsProps {
  title: string;
  hoverText: string;
  onChange: (color: string) => void;
}

const ColorTabs: React.FC<ColorTabsProps> = ({ title, hoverText, onChange }) => {
  const [customColor, setCustomColor] = useState('#000000');
  const colors = [
    { hex: '#ffffff00', value: 'Transparent' },
    { hex: '#333333', value: 'Charcoal' },
    { hex: '#8B4513', value: 'Saddle Brown' },
    { hex: '#2F4F4F', value: 'Dark Slate Gray' },
    { hex: '#4682B4', value: 'Steel Blue' },
    { hex: '#DAA520', value: 'Goldenrod' },
    { hex: '#800080', value: 'Purple' },
    { hex: '#20B2AA', value: 'Light Sea Green' },
  ];

  const handleColorChange = (color: string) => {
    onChange(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {title}
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          {hoverText}
        </HoverCardContent>
      </HoverCard>
      <Tabs defaultValue="charcoal" onValueChange={handleColorChange}>
        <TabsList className='w-full flex justify-between'>
          {colors.map((color) => (
            <TabsTrigger key={color.hex} value={color.hex}>
              <span className="sr-only">{color.value}</span>
              {color.hex === '#ffffff00' ? (
                <div
                  className="h-5 w-5 bg-white relative"
                  style={{ 
                    backgroundImage: 'linear-gradient(to bottom right, transparent calc(50% - 1px), red, transparent calc(50% + 1px))'
                  }}
                ></div>
              ) : (
                <div
                  className="h-5 w-5"
                  style={{ backgroundColor: color.hex }}
                ></div>
              )}
            </TabsTrigger>
          ))}
          <TabsTrigger value={customColor}>
            <div className="flex items-center">
              <div className="relative flex items-center justify-center">
                <div
                  className="h-5 w-5"
                  style={{ backgroundColor: customColor }}
                >
                </div>
                <Input
                  type="text"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  variant="small"
                  className=" ml-2 flex items-center text-muted-foreground bg-transparent border-none"
                />
              </div>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ColorTabs;