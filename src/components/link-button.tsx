import { Link, LinkProps } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

interface LinkButtonProps extends LinkProps<string> {
  title: string
}

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link asChild {...rest}>
      <TouchableOpacity activeOpacity={0.7}>
        <Text className="text-center font-body-regular text-base text-slate-300">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}
