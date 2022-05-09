import React from 'react'
import {Image} from "react-bootstrap"
import { Link } from 'react-router-dom'

function NavbarCustom({user, emptyProfile}) {
  return (
    <div id='head' className='py-2 px-4 d-flex justify-content-between align-items-center shadow'>
      <h1>
        Tahoo.id
      </h1>
      
      <Image fluid='true' roundedCircle='true' src={user.foto !== null ? user.foto:emptyProfile}></Image>
    </div>
  )
}

export default NavbarCustom