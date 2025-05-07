export type CurrencyType = 'Gold' | 'Science' | 'Culture' | 'Happiness' | 'Influence';
export type ActionType = 'Notes' | 'Nature' | 'Urn' | 'Diplomacy' | 'Lock' | 'World' | 'Culture' | 'Science' | 'Age';
export type SizeType = 'sm' | 'md' | 'lg';

export interface ICurrency {
  type: CurrencyType;
  increase: number;
  current?: number;
}
