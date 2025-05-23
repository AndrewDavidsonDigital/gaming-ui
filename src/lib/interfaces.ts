import type { Component } from "vue";

export type CurrencyType = 'Gold' | 'Science' | 'Culture' | 'Happiness' | 'Influence';
export type ActionType = 'Notes' | 'Nature' | 'Urn' | 'Diplomacy' | 'Lock' | 'World' | 'Culture' | 'Science' | 'Age';
export type SizeType = 'sm' | 'md' | 'lg';
export type DiplomacyStateType = 'War' | 'Antagonistic' | 'Neutral' | 'Friendly' | 'Allied' ;
export type ColourType = 'Red' | 'Yellow' | 'Green' | 'Cyan' | 'Orange' ;
export type GameType = 'Civ-7' | 'Stellaris';
export type ControlKeyType = '1' | '2' | '3' | '4' | '5';
export type ControlType = 'Military' | 'Civilian' | 'Planet' | 'Other';
export type AlertType = 'Rift' | 'Research_Bio' | 'Research_Physics' | 'Research_Engineering';

export interface ICurrency {
  type: CurrencyType;
  increase: number;
  current?: number;
}

export interface IColouration {
  main: ColourType;
  alpha: number;
  border?: ColourType;
}

export interface IRoute {
  path: string;
  name: string;
  title?: string,
  game?: GameType;
  component: Component;
}
