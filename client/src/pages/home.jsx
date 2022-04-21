import React from 'react'
import { Container, Tabs, Tab, Row,  } from 'react-bootstrap'
import NavbarCustom from '../components/navbar'
import ProductTab from '../components/productTab'

function Home() {
  return (
    <>
      <NavbarCustom></NavbarCustom>
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
              <div>lorem</div>
            </Tab>
          </Tabs>
        </Row> 
      </Container>
    </>
    
    
  )
}

export default Home