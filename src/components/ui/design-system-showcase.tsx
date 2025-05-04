
import React from 'react';
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./input";
import { Label } from "./label";
import { ThemeToggle } from './theme-toggle';

export function DesignSystemShowcase() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="ds-heading-1">MonAvenir+ Design System</h1>
        <ThemeToggle />
      </div>
      
      <section className="mb-12">
        <h2 className="ds-heading-2 mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ColorCard name="Primary" hexLight="#0039C2" hexDark="#0039C2" colorClass="bg-primary" />
          <ColorCard name="Secondary" hexLight="#00D1FF" hexDark="#00D1FF" colorClass="bg-secondary" />
          <ColorCard name="Background" hexLight="#F7F9FA" hexDark="#1A1F2C" colorClass="bg-background" />
          <ColorCard name="Foreground" hexLight="#1A1F2C" hexDark="#FFFFFF" colorClass="bg-foreground" />
          <ColorCard name="Muted" hexLight="#F7F9FA" hexDark="#363E4A" colorClass="bg-muted" />
          <ColorCard name="Card" hexLight="#FFFFFF" hexDark="#252A33" colorClass="bg-card" />
        </div>
        
        <div className="mt-8">
          <h3 className="ds-heading-3 mb-4">Gray Scale</h3>
          <div className="flex flex-wrap gap-2">
            <ColorSwatch name="100" color="bg-monavenir-gray-100" textColor="text-black" />
            <ColorSwatch name="200" color="bg-monavenir-gray-200" textColor="text-black" />
            <ColorSwatch name="300" color="bg-monavenir-gray-300" textColor="text-black" />
            <ColorSwatch name="400" color="bg-monavenir-gray-400" textColor="text-black" />
            <ColorSwatch name="500" color="bg-monavenir-gray-500" textColor="text-white" />
            <ColorSwatch name="600" color="bg-monavenir-gray-600" textColor="text-white" />
            <ColorSwatch name="700" color="bg-monavenir-gray-700" textColor="text-white" />
            <ColorSwatch name="800" color="bg-monavenir-gray-800" textColor="text-white" />
            <ColorSwatch name="900" color="bg-monavenir-gray-900" textColor="text-white" />
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="ds-heading-3 mb-4">Gradients</h3>
          <div className="flex flex-wrap gap-4">
            <GradientSwatch name="Primary" gradientClass="bg-gradient-primary" />
            <GradientSwatch name="Secondary" gradientClass="bg-gradient-secondary" />
            <GradientSwatch name="Success" gradientClass="bg-gradient-success" />
            <GradientSwatch name="Warning" gradientClass="bg-gradient-warning" />
            <GradientSwatch name="Danger" gradientClass="bg-gradient-danger" />
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="ds-heading-2 mb-4">Typography</h2>
        <div className="space-y-6 bg-card rounded-lg p-6">
          <div>
            <h1 className="ds-heading-1">Heading 1</h1>
            <p className="text-sm text-muted-foreground">2.25rem / 36px</p>
          </div>
          <div>
            <h2 className="ds-heading-2">Heading 2</h2>
            <p className="text-sm text-muted-foreground">1.875rem / 30px</p>
          </div>
          <div>
            <h3 className="ds-heading-3">Heading 3</h3>
            <p className="text-sm text-muted-foreground">1.5rem / 24px</p>
          </div>
          <div>
            <h4 className="ds-heading-4">Heading 4</h4>
            <p className="text-sm text-muted-foreground">1.25rem / 20px</p>
          </div>
          <div>
            <p className="ds-text">Body Text - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-muted-foreground">1rem / 16px</p>
          </div>
          <div>
            <p className="ds-text-small">Small Text - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-muted-foreground">0.875rem / 14px</p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="ds-heading-2 mb-4">Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default">Default</Button>
                <Button variant="default" size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled</Label>
                <Input id="disabled" disabled placeholder="Disabled input" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Example</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cards are used to group related information. They can contain various elements like text, buttons, and images.</p>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="ds-heading-2 mb-4">Spacing System</h2>
        <div className="bg-card p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SpacingExample name="1 (0.25rem / 4px)" size="w-1 h-1" />
            <SpacingExample name="2 (0.5rem / 8px)" size="w-2 h-2" />
            <SpacingExample name="4 (1rem / 16px)" size="w-4 h-4" />
            <SpacingExample name="6 (1.5rem / 24px)" size="w-6 h-6" />
            <SpacingExample name="8 (2rem / 32px)" size="w-8 h-8" />
            <SpacingExample name="12 (3rem / 48px)" size="w-12 h-12" />
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="ds-heading-2 mb-4">Accessibility Features</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="list-disc pl-5 space-y-2">
              <li>All interactive elements have appropriate focus states</li>
              <li>Color contrast ratios meet WCAG AA standards</li>
              <li>Proper semantic HTML is used throughout the application</li>
              <li>ARIA attributes are added where necessary</li>
              <li>Support for reduced motion preferences</li>
              <li>Keyboard navigation support</li>
              <li>Screen reader friendly components</li>
              <li>Responsive design for all screen sizes</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

type ColorCardProps = {
  name: string;
  hexLight: string;
  hexDark: string;
  colorClass: string;
};

function ColorCard({ name, hexLight, hexDark, colorClass }: ColorCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border">
      <div className={`h-24 ${colorClass}`} />
      <div className="p-3 bg-card">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">Light: {hexLight}</p>
        <p className="text-sm text-muted-foreground">Dark: {hexDark}</p>
      </div>
    </div>
  );
}

type ColorSwatchProps = {
  name: string;
  color: string;
  textColor: string;
};

function ColorSwatch({ name, color, textColor }: ColorSwatchProps) {
  return (
    <div className={`w-16 h-16 ${color} rounded flex items-center justify-center`}>
      <span className={`text-xs font-medium ${textColor}`}>{name}</span>
    </div>
  );
}

type GradientSwatchProps = {
  name: string;
  gradientClass: string;
};

function GradientSwatch({ name, gradientClass }: GradientSwatchProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm">
      <div className={`h-16 w-32 ${gradientClass}`} />
      <div className="p-2 text-center bg-card text-xs">{name}</div>
    </div>
  );
}

type SpacingExampleProps = {
  name: string;
  size: string;
};

function SpacingExample({ name, size }: SpacingExampleProps) {
  return (
    <div className="flex items-center">
      <div className={`${size} bg-primary rounded-md mr-3`} />
      <span className="text-sm">{name}</span>
    </div>
  );
}
