import { Pressable, PressableProps, Text } from 'react-native'
import { clsx } from 'clsx'

interface CategoryButtonProps extends PressableProps {
  title: string
  isSelected?: boolean
}

export function CategoryButton({
  title,
  isSelected,
  ...rest
}: CategoryButtonProps) {
  return (
    <Pressable
      {...rest}
      aria-selected={isSelected}
      className={clsx('h-10 justify-center rounded-md bg-slate-800 px-4', {
        'border-2 border-lime-300': isSelected,
      })}
    >
      <Text className="font-body-medium text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
