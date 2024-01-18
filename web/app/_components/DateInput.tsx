import 'react-datepicker/dist/react-datepicker.css'
import { UseControllerProps, useController } from 'react-hook-form'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

type Props = {
    label: string
    type?: string
    showLabel?: string
} & UseControllerProps &
    Partial<ReactDatePickerProps>

export function DateInput(props: Props) {
    const { field, fieldState } = useController({ ...props, defaultValue: '' })

    return (
        <div className="block w-full">
            <DatePicker
                {...field}
                {...props}
                onChange={(value) => field.onChange(value)}
                selected={field.value}
                placeholderText={props.label}
                className={`rounded-lg w-full flex flex-col ${
                    fieldState.error ? 'bg-red-50 border-red-500 text-red-900' : !fieldState.invalid && fieldState.isDirty ? 'bg-green-40' : 'bg-green-50 text-green-900 border-green-500'
                }`}
            />
            {fieldState.error && <div className="text-red-500 text-sm mt-2">{fieldState.error.message}</div>}
        </div>
    )
}
