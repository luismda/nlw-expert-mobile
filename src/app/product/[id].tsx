import { Image, ScrollView, Text, View } from 'react-native'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'

import { PRODUCTS } from '@/utils/data/products'
import { priceFormatter } from '@/utils/functions/price-formatter'

import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

export default function Product() {
  const cartStore = useCartStore()

  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((product) => product.id === id)

  function handleAddToCart() {
    if (!product) return

    cartStore.add(product)
    navigation.goBack()
  }

  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-slate-900"
    >
      <Image
        source={product.cover}
        alt={product.title}
        className="h-52 w-full"
        resizeMode="cover"
      />

      <View className="flex-1 px-5 py-8">
        <Text className="font-body-medium text-xl text-white">
          {product.title}
        </Text>

        <Text className="my-2 font-heading text-2xl text-lime-400">
          {priceFormatter(product.price)}
        </Text>

        <Text className="mb-6 font-body-regular text-base leading-6 text-slate-400">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="font-body-regular text-base leading-6 text-slate-400"
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleAddToCart}>
          <Button.Icon name="plus-circle" size={20} />
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </ScrollView>
  )
}
