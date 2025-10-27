// Dashboard Types
// Auto-generated from Figma design specs

export type CategoryType = 
  | 'mortgage'
  | 'utilities' 
  | 'home'
  | 'food'
  | 'auto'
  | 'entertainment'
  | 'health'
  | 'software'
  | 'personal'
  | 'fees'
  | 'george';

export interface CategoryBudget {
  category: CategoryType;
  label: string;
  spent: number;
  budget: number;
  alerts?: {
    success?: boolean;
    warning?: boolean;
    error?: boolean;
  };
}

export interface SavingsGoal {
  name: string;
  percentage: number;
  color: 'blue' | 'green' | 'pink';
  current?: number;
  target?: number;
}

export interface AIQuestion {
  id: string;
  question: string;
}

