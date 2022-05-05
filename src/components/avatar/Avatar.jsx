import React from 'react'
import './avatar.css'


const Avatar = ({src}) => {
  return (
    <div className="avatar"   >
        <div className="img" style={{backgroundImage:`url(${src})`}}></div>
    </div>
  )
}

export default Avatar