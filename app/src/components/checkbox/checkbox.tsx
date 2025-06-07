import { Checkbox } from 'radix-ui'
import { Icon } from '@iconify/react'

const CheckboxComponent = () => {
  return (
    <Checkbox.Root
      className="flex w-4 h-4 rounded-sm border border-zinc-700 justify-center items-center
      focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      <Checkbox.Indicator className="w-4 h-4 rounded-sm">
        <Icon
          icon="fluent:checkmark-12-filled"
          className="text-white translate-y-[0.5px]"
        />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export default CheckboxComponent
