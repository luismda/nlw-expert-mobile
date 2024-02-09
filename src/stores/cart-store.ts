import { create } from 'zustand'

import * as cartInMemory from './helpers/cart-in-memory'

import { ProductProps } from '@/utils/data/products'

export type ProductCartProps = ProductProps & {
  amount: number
}

interface CartStore {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],

  add: (product) => {
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    }))
  },
}))
