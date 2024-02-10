import { useState } from 'react'
import { Alert, Text, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'

import { ProductProps } from '@/utils/data/products'
import { priceFormatter } from '@/utils/functions/price-formatter'

import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Product } from '@/components/product'
import { LinkButton } from '@/components/link-button'

const PHONE_NUMBER = process.env.EXPO_PUBLIC_PHONE_NUMBER

export default function Cart() {
  const cartStore = useCartStore()
  const [address, setAddress] = useState('')

  const navigation = useNavigation()

  const totalPrice = priceFormatter(
    cartStore.products.reduce((total, { price, amount }) => {
      return total + price * amount
    }, 0),
  )

  function handleRemoveProduct(product: ProductProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleFinishOrder() {
    if (address.trim().length === 0) {
      return Alert.alert(
        'Enviar pedido',
        'Por favor, informe o endereço de entrega.',
      )
    }

    const productsList = cartStore.products
      .map((product) => {
        return `\n${product.amount} ${product.title}`
      })
      .join('')

    const message = `🍔 NOVO PEDIDO!\n\n🏠 ${address.trim()}\n\n🛒 Pedido:${productsList}\n\n💰 Preço total: ${totalPrice}`

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    setAddress('')
    cartStore.clear()
    navigation.goBack()
  }

  const isShouldDisabled = cartStore.products.length === 0

  return (
    <View className="flex-1 bg-slate-900 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        extraHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 p-5">
          {cartStore.products.length > 0 ? (
            <View className="mb-5 border-b border-slate-700">
              {cartStore.products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleRemoveProduct(product)}
                />
              ))}
            </View>
          ) : (
            <Text className="my-8 text-center font-body-regular text-slate-400">
              Seu carrinho está vazio.
            </Text>
          )}

          <View className="mb-4 flex-row items-center gap-2">
            <Text className="font-body-medium text-xl text-white">Total:</Text>

            <Text className="font-heading text-2xl text-lime-400">
              {totalPrice}
            </Text>
          </View>

          <Input
            blurOnSubmit
            returnKeyType="next"
            isDisabled={isShouldDisabled}
            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
            onChangeText={setAddress}
            onSubmitEditing={handleFinishOrder}
          />
        </View>
      </KeyboardAwareScrollView>

      <View className="gap-5 px-5 pb-8 pt-5">
        <Button isDisabled={isShouldDisabled} onPress={handleFinishOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon name="arrow-right-circle" size={20} />
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
