import { ProductCartProps } from '../cart-store'
import { ProductProps } from '@/utils/data/products'

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(
    (product) => product.id === newProduct.id,
  )

  if (existingProduct) {
    return products.map((product) =>
      product.id === newProduct.id
        ? { ...product, amount: product.amount + 1 }
        : product,
    )
  }

  return [...products, { ...newProduct, amount: 1 }]
}
