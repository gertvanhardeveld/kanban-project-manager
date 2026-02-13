import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../utils/constants';

const BoardContext = createContext(null);

// Reducer actions
const ADD_CARD = 'ADD_CARD';
const UPDATE_CARD = 'UPDATE_CARD';
const DELETE_CARD = 'DELETE_CARD';
const MOVE_CARD = 'MOVE_CARD';
const SET_CARDS = 'SET_CARDS';

// Reducer functie
const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_CARDS:
      return action.payload;

    case ADD_CARD: {
      const newCard = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description || '',
        status: action.payload.status,
        priority: action.payload.priority || 'medium',
        tags: action.payload.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return [...state, newCard];
    }

    case UPDATE_CARD: {
      return state.map(card =>
        card.id === action.payload.id
          ? { ...card, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : card
      );
    }

    case DELETE_CARD: {
      return state.filter(card => card.id !== action.payload.id);
    }

    case MOVE_CARD: {
      return state.map(card =>
        card.id === action.payload.id
          ? { ...card, status: action.payload.newStatus, updatedAt: new Date().toISOString() }
          : card
      );
    }

    default:
      return state;
  }
};

// Provider component
export const BoardContextProvider = ({ children }) => {
  const [storedCards, setStoredCards] = useLocalStorage(STORAGE_KEY, []);
  const [cards, dispatch] = useReducer(boardReducer, storedCards);

  // Sync met localStorage bij elke state change
  useEffect(() => {
    setStoredCards(cards);
  }, [cards, setStoredCards]);

  // Actions
  const addCard = (cardData) => {
    dispatch({ type: ADD_CARD, payload: cardData });
  };

  const updateCard = (id, updates) => {
    dispatch({ type: UPDATE_CARD, payload: { id, updates } });
  };

  const deleteCard = (id) => {
    if (window.confirm('Weet je zeker dat je deze kaart wilt verwijderen?')) {
      dispatch({ type: DELETE_CARD, payload: { id } });
    }
  };

  const moveCard = (id, newStatus) => {
    dispatch({ type: MOVE_CARD, payload: { id, newStatus } });
  };

  const value = {
    cards,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook voor het consumeren van de context
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardContextProvider');
  }
  return context;
};
