import React from 'react'
import { Row, Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <Row className='justify-content-center p-5'>
      <Spinner animation='border' role='status' className='page-loading'>
      <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  )
}
