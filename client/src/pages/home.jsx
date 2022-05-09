import React, { useState } from "react";
import { Container, Tabs, Tab, Row } from "react-bootstrap";
import NavbarCustom from "../components/customer/navbar";
import OrderTab from "../components/customer/Tabs/orderTab";
import ProductTab from "../components/customer/Tabs/productTab";
import ProfileTab from "../components/customer/Tabs/profileTab";

const emptyProfile =
  "https://res.cloudinary.com/dgmknbm2h/image/upload/v1650552671/ppl/blank-profile-picture-973460_1280-300x300_lnk5bk.jpg";
function Home({ user, setUser }) {
  const [changeOrder, setChangeOrder] = useState(false);

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
              <div>lorem</div>
            </Tab>
            <Tab eventKey="Produk" title="Produk">
              <ProductTab
                setChangeOrder={setChangeOrder}
                user={user}
              ></ProductTab>
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
