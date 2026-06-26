import { Outfit } from './fashion';

export interface RunwayShow {
  id: string;
  outfit: Outfit;
  theme: string;
  audience: number;
  score: number;
  feedback: string;
  createdAt: Date;
}

export type RunwayAction =
  | {
      type: 'START_SHOW';
      payload: RunwayShow;
    }
  | {
      type: 'END_SHOW';
      payload: RunwayShow;
    }
  | {
      type: 'UPDATE_SCORE';
      payload: number;
    };
