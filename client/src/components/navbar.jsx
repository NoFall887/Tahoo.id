import React from 'react'
import {Image} from "react-bootstrap"
function NavbarCustom() {
  return (
    <div id='head' className='py-2 px-4 d-flex justify-content-between align-items-center'>
      <h1>
        Tahoo.id
      </h1>
      <Image fluid='true' roundedCircle='true' src='https://pbs.twimg.com/profile_images/875749462957670400/T0lwiBK8_400x400.jpg'></Image>
    </div>
  )
}

export default NavbarCustom