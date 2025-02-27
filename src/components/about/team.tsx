import React from 'react'
import { PageMeta, registerMetaForRoute } from '../../utils/head'

// Register metadata for this route
registerMetaForRoute('/about/team', {
	title: "Team | Vite + React + TS",
	description: "Learn about our team and our mission",
	keywords: "about us, company, mission, team",
});
const team = () => {
  return (
    <div className='container mx-auto'>
      <div className='w-full h-full bg-red-500'>team</div>
    </div>
  )
}

export default team