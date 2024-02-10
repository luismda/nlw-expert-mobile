import { TextInput, TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'
import { clsx } from 'clsx'

interface InputProps extends TextInputProps {
  isDisabled?: boolean
}

export function Input({ isDisabled = false, ...rest }: InputProps) {
  return (
    <TextInput
      multiline
      editable={!isDisabled}
      textAlignVertical="top"
      cursorColor={colors.slate[400]}
      placeholderTextColor={colors.slate[400]}
      className={clsx(
        'h-32 rounded-md bg-slate-800 px-4 py-3 font-body-regular text-sm text-white',
        {
          'opacity-70': isDisabled,
        },
      )}
      {...rest}
    />
  )
}
