// Helper functions for validating cart data

// Validate individual cart item
export const validateCartItem = (item: any) => {
    if (!item.product_id || typeof item.product_id !== 'string') {
      return { valid: false, message: 'Invalid or missing productId' };
    }
  
    if (!item.selected_color || typeof item.selected_color !== 'string') {
      return { valid: false, message: 'Invalid or missing selected_color' };
    }
  
    if (!item.selected_memory_size || typeof item.selected_memory_size !== 'string') {
      return { valid: false, message: 'Invalid or missing selected_memory_size' };
    }
  
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      return { valid: false, message: 'Invalid quantity. It must be a positive number' };
    }
  
    if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
      return { valid: false, message: 'Invalid price. It must be a positive number' };
    }
  
    return { valid: true };
  };
  
  // Validate the entire cart object before processing
  export const validateCart = (cart: any) => {
    if (!Array.isArray(cart.cartItems)) {
      return { valid: false, message: 'Cart must contain an array of items' };
    }
  
    if (cart.cartItems.length === 0) {
      return { valid: false, message: 'Cart cannot be empty' };
    }
  
    let totalPrice = 0;
  
    for (let item of cart.cartItems) {
      const itemValidation = validateCartItem(item);
  
      if (!itemValidation.valid) {
        return itemValidation; // Return validation error for the first invalid item
      }
  
      // Accumulate total price
      totalPrice += item.price * item.quantity;
    }
  
    // If all items are valid, we can check if the total price matches.
    if (cart.totalPrice !== totalPrice) {
      return { valid: false, message: 'Total price does not match the sum of items' };
    }
  
    return { valid: true };
  };
  