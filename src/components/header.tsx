import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

interface HeaderProps {
  title: string
  totalCartItems?: number
}

export function Header({ title, totalCartItems }: HeaderProps) {
  const hasTotalCartItems = totalCartItems !== undefined

  return (
    <View className="mx-5 flex-row items-center border-b border-slate-700 pb-5">
      <View className="flex-1">
        <Image
          source={require('@/assets/logo.png')}
          alt="NLW Expert"
          className="h-6 w-32"
        />

        <Text className="mt-2 font-heading text-xl text-white">{title}</Text>
      </View>

      {hasTotalCartItems && (
        <Link href="/cart" asChild>
          <TouchableOpacity activeOpacity={0.7}>
            {totalCartItems > 0 && (
              <View className="absolute -right-2 -top-2 z-10 h-4 w-4 items-center justify-center rounded-full bg-lime-300">
                <Text className="font-body-bold text-xs text-slate-900">
                  {totalCartItems}
                </Text>
              </View>
            )}

            <Feather name="shopping-bag" size={24} color={colors.white} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
