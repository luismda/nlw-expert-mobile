import { useState, useRef } from 'react'
import { View, FlatList, SectionList, Text } from 'react-native'
import { Link } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { CategoryButton } from '@/components/category-button'

export default function Home() {
  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const totalCartItems = useCartStore((state) => {
    return state.products.reduce((total, product) => total + product.amount, 0)
  })

  function handleSelectCategory(index: number) {
    setCategoryIndex(index)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        itemIndex: 0,
        animated: true,
        sectionIndex: index,
      })
    }
  }

  return (
    <View className="flex-1 bg-slate-900 pt-8">
      <Header title="Faça seu pedido" totalCartItems={totalCartItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CategoryButton
            title={item}
            isSelected={index === categoryIndex}
            onPress={() => handleSelectCategory(index)}
          />
        )}
        className="my-5 max-h-10"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        horizontal
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mb-3 mt-8 font-heading text-xl text-white">
            {title}
          </Text>
        )}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
