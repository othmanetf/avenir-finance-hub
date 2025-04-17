
import { z } from 'zod';

export const getZodErrorMessage = (fieldName: string, error: z.ZodIssue | undefined): string => {
  if (!error) return '';
  
  // Customize the error message based on error code
  switch (error.code) {
    case 'invalid_type':
      return `Le champ ${fieldName} est requis`;
    case 'too_small':
      return `Le champ ${fieldName} doit avoir au moins ${error.minimum} caractères`;
    case 'too_big':
      return `Le champ ${fieldName} ne doit pas dépasser ${error.maximum} caractères`;
    case 'invalid_string':
      if (error.validation === 'email') {
        return `Veuillez saisir une adresse email valide`;
      }
      return error.message;
    default:
      return error.message;
  }
};

export const validatePassword = (password: string): string[] => {
  const issues: string[] = [];

  if (password.length < 8) {
    issues.push('Au moins 8 caractères');
  }
  if (!/[A-Z]/.test(password)) {
    issues.push('Au moins une lettre majuscule');
  }
  if (!/[a-z]/.test(password)) {
    issues.push('Au moins une lettre minuscule');
  }
  if (!/[0-9]/.test(password)) {
    issues.push('Au moins un chiffre');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    issues.push('Au moins un caractère spécial');
  }

  return issues;
};
