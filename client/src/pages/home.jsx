import React from 'react'
import { Container, Tabs, Tab, Row,  } from 'react-bootstrap'
import NavbarCustom from '../components/navbar'
import ProductTab from '../Tabs/productTab'
import ProfileTab from '../Tabs/profileTab'

const emptyProfile = 'https://res.cloudinary.com/dgmknbm2h/image/upload/v1650552671/ppl/blank-profile-picture-973460_1280-300x300_lnk5bk.jpg'
function Home({user}) {
  return (
    <>
      <NavbarCustom user={user} emptyProfile={emptyProfile}></NavbarCustom>
      <Container id='main' className='d-flex justify-content-center flex-column' fluid>
        <Row className='shadow align-items-center m-5 rounded-3' id="main-tabs">
          <Tabs defaultActiveKey="Produk">
            <Tab eventKey="Beranda" title="Beranda">
              <div>lorem</div>
            </Tab>
            <Tab eventKey="Produk" title="Produk">
              <ProductTab></ProductTab>
            </Tab>
            <Tab eventKey="Data Pesanan" title="Data pesanan">
              <div>lorem</div>
            </Tab>
            <Tab eventKey="Profile" title="Profile">
              <ProfileTab user={user} emptyProfile={emptyProfile}/>
            </Tab>
          </Tabs>
        </Row> 
      </Container>
    </>
    
    
  )
}

export default Home