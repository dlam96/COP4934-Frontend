import React from 'react'
import ReactDOM from 'react-dom'

function UserPortal() {
  return ReactDOM.createPortal(
    <h1>User Portal</h1>,
    document.getElementById('user-portal')
  )
}

export default UserPortal