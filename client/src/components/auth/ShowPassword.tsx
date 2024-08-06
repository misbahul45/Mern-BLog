import React from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface Props {
    onClick: () => void,
    showPassword: boolean
}
const ShowPassword = ({ onClick, showPassword } : Props) => {
  return (
    <button type="button" onClick={onClick} className="absolute top-1/2 right-2 -translate-y-1/2">
      {showPassword?<FaEye />:<FaEyeSlash />}
    </button>
  )
}

export default React.memo(ShowPassword)
