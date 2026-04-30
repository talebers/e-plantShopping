import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.cost.substring(1)) * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <div style={{ backgroundColor: '#4CAF50', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white' }}>
          <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
          <p style={{ margin: 0, fontSize: '12px' }}>Where Green Meets Serenity</p>
        </div>
        <span style={{ color: 'white', fontWeight: 'bold' }}>Plants</span>
        <span style={{ color: 'white', fontSize: '20px' }}>🛒 {totalItems}</span>
      </div>
      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <img src={item.image} alt={item.name} style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
                <p style={{ margin: '0 0 4px' }}>{item.cost}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '4px 10px', fontSize: '16px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '4px 10px', fontSize: '16px' }}>+</button>
                </div>
                <p style={{ margin: '0 0 8px' }}>Total: ${calculateTotalCost(item)}</p>
                <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={handleContinueShopping} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
