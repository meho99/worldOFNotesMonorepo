import { useState } from 'react'

export const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  }
}
