'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartContext } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isOpen,
    setIsOpen,
    clearCart,
  } = useCartContext();

  const handleCheckout = () => {
    // Simulate checkout process
    alert('Checkout functionality would be implemented here');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral">
                <h2 className="text-xl font-semibold text-primary">Your Cart</h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <ShoppingBag className="w-16 h-16 text-text-muted mb-4" />
                    <p className="text-lg font-medium text-primary mb-2">Your cart is empty</p>
                    <p className="text-sm text-text-secondary mb-6">Add some beautiful geles to get started</p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIsOpen(false);
                        window.location.href = '/shop';
                      }}
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 bg-white border border-neutral rounded-lg p-4"
                        >
                          {/* Product Image */}
                          <div className="relative w-20 h-20 bg-neutral/20 rounded-md overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral/10 to-neutral/30" />
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-text-muted">
                              Image
                            </span>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-primary mb-1">{item.name}</h3>
                            <p className="text-sm text-text-secondary mb-2">{item.price}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-text-secondary hover:text-primary transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-text-secondary hover:text-primary transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-text-muted hover:text-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {items.length > 0 && (
                      <motion.button
                        onClick={clearCart}
                        className="w-full text-sm text-text-secondary hover:text-accent transition-colors py-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear all items
                      </motion.button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-neutral p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-primary">Total</span>
                    <span className="text-xl font-bold text-primary">{getCartTotal()}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}