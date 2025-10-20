export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  images?: string[]; // Additional product images shown on detail page
  mannequin: string; // Path to mannequin reference image for virtual try-on
  category: 'traditional' | 'modern' | 'bridal';
  color: string;
  featured: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => string;
  getItemCount: () => number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}