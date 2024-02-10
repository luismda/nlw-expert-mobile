import { forwardRef } from 'react'

import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type Product = {
  title: string
  amount?: number
  description: string
  thumbnail: ImageProps
}

interface ProductProps extends TouchableOpacityProps {
  data: Product
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        {...rest}
        ref={ref}
        activeOpacity={0.7}
        className="w-full flex-row items-center pb-4"
      >
        <Image
          source={data.thumbnail}
          alt={data.title}
          className="h-20 w-20 rounded-md"
        />

        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-1 font-body-medium text-base text-slate-100">
              {data.title}
            </Text>

            {!!data.amount && (
              <Text className="font-body-medium text-sm text-slate-400">
                x {data.amount}
              </Text>
            )}
          </View>

          <Text
            className="mt-0.5 flex-1 text-xs leading-5 text-slate-400"
            numberOfLines={3}
          >
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)

Product.displayName = 'Product'
