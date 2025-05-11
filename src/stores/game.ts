import { defineStore } from 'pinia'
import type { GameType } from '@/lib/interfaces';

interface IGame {
  game: GameType;
}

const DEFAULT_STATE: Readonly<IGame> = {
  game: 'Civ-7',
};

export const useGame = defineStore('game', {

  state: () => {
    return ({...DEFAULT_STATE} as IGame);
  },

  actions: {
    _setType(newType: GameType){
      this.game = newType;
    }
  }  
});
