import React from 'react'
import { Outlet } from 'react-router-dom'
import TeamComponent from '../../components/about/team'
const Team = () => {
  return (
    <div>
      <h1>Team</h1>
      <TeamComponent />
    </div>
  )
}

export default Team