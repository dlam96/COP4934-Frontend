import React from 'react'
import ReactDOM from 'react-dom'

function SchedulerPortal() {
  return ReactDOM.createPortal(
    <h1>Scheduler Portal</h1>,
    document.getElementById('scheduler-portal')
  )
}

export default SchedulerPortal