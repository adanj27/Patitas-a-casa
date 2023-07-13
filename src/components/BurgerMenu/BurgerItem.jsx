import React from 'react'
import { NavLink } from "react-router-dom"

const BurgerItem = ({ texto, to }) => {
  return (
    <>
      <NavLink to={to}>
        {texto}
      </NavLink>
    </>
  )
}

export default BurgerItem
