import React, { useState } from 'react'
import ProfileDetail from '../components/profile/profileDetail'
import ProfileEditForm from '../components/profile/profileEditForm'

const ProfileTab = React.memo(
  ({user, emptyProfile, setUser}) => {
    const [editMode, setEditMode] = useState(false)
    console.log(user)
    return editMode?<ProfileEditForm user={user} emptyProfile={emptyProfile} setUser={setUser} setEditMode={setEditMode} />:<ProfileDetail user={user} setUser={setUser} emptyProfile={emptyProfile} setEditMode={setEditMode}/>
  }  
) 
export default ProfileTab;