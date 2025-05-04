
import React from 'react';
import { DesignSystemShowcase } from '@/components/ui/design-system-showcase';
import { ThemeProvider } from '@/components/ui/theme-provider';

export default function DesignSystem() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DesignSystemShowcase />
      </div>
    </ThemeProvider>
  );
}
