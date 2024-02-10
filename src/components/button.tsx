import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { ComponentProps } from 'react'
import { Feather } from '@expo/vector-icons'
import { clsx } from 'clsx'

interface ButtonProps extends TouchableOpacityProps {
  isDisabled?: boolean
}

type ButtonTextProps = TextProps
type ButtonIconProps = ComponentProps<typeof Feather>

function Button({ isDisabled = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      className={clsx(
        'h-12 flex-row items-center justify-center rounded-md bg-lime-400',
        {
          'opacity-70': isDisabled,
        },
      )}
      {...rest}
    />
  )
}

function ButtonText(props: ButtonTextProps) {
  return <Text className="mx-2 font-heading text-base text-black" {...props} />
}

function ButtonIcon(props: ButtonIconProps) {
  return <Feather {...props} />
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
