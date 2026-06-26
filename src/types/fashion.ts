export interface Outfit {
  id: string;
  name: string;
  top: string;
  bottom: string;
  shoes: string;
  accessory?: string;
  createdAt: Date;
  style: 'casual' | 'formal' | 'sporty' | 'bohemian' | 'vintage';
}

export interface FashionItem {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'shoes' | 'accessory';
  color: string;
  style: string;
  imageUrl?: string;
}

export type FashionAction =
  | {
      type: 'SELECT_ITEM';
      payload: { category: string; item: string };
    }
  | {
      type: 'CLEAR_SELECTION';
    }
  | {
      type: 'SAVE_OUTFIT';
      payload: Outfit;
    }
  | {
      type: 'DELETE_OUTFIT';
      payload: string;
    };
