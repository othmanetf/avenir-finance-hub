
import React from 'react';
import { DesignSystemShowcase } from '@/components/ui/design-system-showcase';
import { ThemeProvider } from '@/components/ui/theme-provider';

export default function DesignSystem() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <DesignSystemShowcase />
    </ThemeProvider>
  );
}
