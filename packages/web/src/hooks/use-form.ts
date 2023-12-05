import { useState } from 'preact/hooks'

interface Validation {
  required?: {
    value: boolean
    message: string
  }
  pattern?: {
    value: string
    message: string
  }
  custom?: {
    isValid: (value: string) => boolean
    message: string
  }
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>

export const useForm = <
  T extends Partial<Record<keyof T, any>> = Record<string, never>,
>(options?: {
  validations?: Validations<T>
  initialValues?: Partial<T>
  onSubmit?: (e: Event) => void
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T)
  const [errors, setErrors] = useState<ErrorRecord<T>>({})

  const handleChange =
    <S>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = sanitizeFn
        ? sanitizeFn(e.currentTarget.value)
        : e.currentTarget.value
      setData({
        ...data,
        [key]: value,
      })
    }

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validations = options?.validations
    if (validations) {
      let valid = true
      const newErrors: ErrorRecord<T> = {}
      for (const key in validations) {
        const value = data[key]
        const validation = validations[key]
        if (validation?.required?.value && !value) {
          valid = false
          newErrors[key] = validation?.required?.message
        }

        const pattern = validation?.pattern
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false
          newErrors[key] = pattern.message
        }

        const custom = validation?.custom
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false
          newErrors[key] = custom.message
        }
      }

      if (!valid) {
        setErrors(newErrors)
        return
      }
    }

    setErrors({})

    if (options?.onSubmit) {
      options.onSubmit(e)
    }
  }

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  }
}
