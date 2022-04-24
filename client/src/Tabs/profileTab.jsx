import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Image, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ProfileEditForm from '../components/profileEditForm'

export default function ProfileTab({user, emptyProfile, setUser}) {
  let navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  function edit() {
    setEditMode(true)
  }

  function handleLogout() {
    setIsLoading(true)
    axios.post('http://localhost:5000/auth/logout', {}, {withCredentials:true})
    .then(response => {
      if(response.data.success === true) {
        setIsLoading(false)
        setUser(false)
        navigate('/login')
        return
      }
    })
  }

  if (editMode) return <ProfileEditForm user={user} emptyProfile={emptyProfile} setUser={setUser} setEditMode={setEditMode} />

  return (
    <Row className='justify-content-around profile-container align-items-center'>
      <Col className='user-profile-container shadow col-4 d-flex justify-content-center'>
        <div className='user-img-container p-4'>
          <Image className='mb-4' src={user.foto !== null ? user.foto:emptyProfile} roundedCircle='true' fluid='true'/>
          <p className='username'>{user.username}</p>
        </div>
      </Col>
      <Col className='col-6'>
        <div className='rounded-pill profile-text-cont mb-3'>
          <p className='rounded-pill nama'>Nama : {user.nama} </p>
        </div>
        <div className='rounded-pill profile-text-cont mb-5'>
          <p className='email'>E-mail : {user.email} </p>
        </div>

        <div className='d-grid gap-3'>
          <Button onClick={edit} className='rounded-pill' >Ubah data akun</Button>
          <Button onClick={handleLogout} variant='danger' className='rounded-pill' disabled={isLoading} >
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Logout" }
          </Button>
        </div>
        
      </Col>
    </Row>
  )
}
