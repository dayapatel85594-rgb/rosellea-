import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../utils/apiService';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        totalItems: action.payload.totalItems || 0,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
        totalItems: 0
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  loading: false,
  error: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiService.getCart();
      if (response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch (error) {
      // Only set error if not 401 Unauthorized (no token)
      if (!error.message?.toLowerCase().includes('access denied') && !error.message?.toLowerCase().includes('401')) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'CLEAR_CART' });
      }
    }
  };

  const addToCart = async (product, quantity = 1, size = null, color = null) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Please login to add items to cart');
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.addToCart({
        productId: product._id,
        quantity,
        size,
        color
      });

      if (response && response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
        return { success: true };
      } else {
        throw new Error(response?.message || 'Failed to add item to cart');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.updateCartItem(itemId, quantity);

      if (response && response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
        return { success: true };
      } else {
        throw new Error(response?.message || 'Failed to update cart item');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.removeFromCart(itemId);

      if (response && response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
        return { success: true };
      } else {
        throw new Error(response?.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await apiService.clearCart();

      if (response && response.success) {
        dispatch({ type: 'SET_CART', payload: response.data });
        return { success: true };
      } else {
        throw new Error(response?.message || 'Failed to clear cart');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartItemCount,
    getCartTotal,
    cartItems: state.items // For backward compatibility
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};