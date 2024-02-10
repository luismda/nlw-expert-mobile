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

export function remove(
  products: ProductCartProps[],
  productToBeRemovedId: string,
) {
  const updatedProducts = products.map((product) => {
    if (product.id !== productToBeRemovedId) return product

    return {
      ...product,
      amount: product.amount > 1 ? product.amount - 1 : 0,
    }
  })

  return updatedProducts.filter((product) => product.amount > 0)
}
