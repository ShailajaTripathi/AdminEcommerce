import React from 'react'

const Button = (
    {
        commonClass="" ,
        addedClass="",
        onClick,
        text="",
        type = "submit",
        disabled = false,
        icon,
        ...rest
    }
) => {
  return (
   <button type={type} className={`${commonClass} ${addedClass}`} disabled={disabled} onClick={onClick} {...rest}>{text}{icon}</button>
  )
}

export default Button