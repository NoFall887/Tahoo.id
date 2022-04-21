import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

export default function ProfileTab({user, emptyProfile}) {
  return (
    <Row className='justify-content-around'>
      <Col className='user-profile-container shadow col-4'>
        <div className='user-img-container'>
          <Image src={user.foto !== null ? user.foto:emptyProfile} roundedCircle='true' fluid='true'/>
        </div>
      </Col>
      <Col></Col>
    </Row>
  )
}
