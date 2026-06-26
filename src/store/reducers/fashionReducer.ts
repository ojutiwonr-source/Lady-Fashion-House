import { Outfit, FashionAction } from '../../types/fashion';

export interface FashionState {
  outfits: Outfit[];
  currentOutfit: Outfit | null;
  selectedItems: {
    top?: string;
    bottom?: string;
    shoes?: string;
    accessory?: string;
  };
}

const initialState: FashionState = {
  outfits: [],
  currentOutfit: null,
  selectedItems: {},
};

export default function fashionReducer(
  state = initialState,
  action: FashionAction
): FashionState {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          [action.payload.category]: action.payload.item,
        },
      };
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedItems: {},
      };
    case 'SAVE_OUTFIT':
      return {
        ...state,
        outfits: [...state.outfits, action.payload],
        selectedItems: {},
      };
    case 'DELETE_OUTFIT':
      return {
        ...state,
        outfits: state.outfits.filter(outfit => outfit.id !== action.payload),
      };
    default:
      return state;
  }
}
