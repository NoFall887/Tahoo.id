import React, { useState } from "react";
import { Container, Tabs, Tab, Row } from "react-bootstrap";
import HomeCarousel from "../components/customer/carousel";
import NavbarCustom from "../components/customer/navbar";
import CartTab from "../components/customer/Tabs/cartTab";
import OrderTab from "../components/customer/Tabs/orderTab";
import ProductTab from "../components/customer/Tabs/productTab";
import ProfileTab from "../components/customer/Tabs/profileTab";

const emptyProfile =
  "data:image/jpeg;base64,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";
function Home({ user, setUser }) {
  const [changeOrder, setChangeOrder] = useState(false);
  const [changeCart, setChangeCart] = useState(false);

  return (
    <>
      <NavbarCustom user={user} emptyProfile={emptyProfile}></NavbarCustom>
      <Container
        id="main"
        className="d-flex justify-content-center flex-column"
        fluid
      >
        <Row className="shadow align-items-center m-5 rounded-3" id="main-tabs">
          <Tabs defaultActiveKey="Beranda">
            <Tab eventKey="Beranda" title="Beranda">
              <HomeCarousel />
            </Tab>
            <Tab eventKey="Produk" title="Produk">
              <ProductTab
                setChangeCart={setChangeCart}
                user={user}
              ></ProductTab>
            </Tab>
            <Tab eventKey="Keranjang" title="Keranjang">
              <CartTab
                setChangeOrder={setChangeOrder}
                user={user}
                changeCart={changeCart}
                setChangeCart={setChangeCart}
              ></CartTab>
            </Tab>
            <Tab eventKey="Data Pesanan" title="Data pesanan">
              <OrderTab
                changeOrder={changeOrder}
                setChangeOrder={setChangeOrder}
                user={user}
              ></OrderTab>
            </Tab>
            <Tab eventKey="Profile" title="Profile">
              <ProfileTab
                user={user}
                setUser={setUser}
                emptyProfile={emptyProfile}
              />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
}

export default Home;
