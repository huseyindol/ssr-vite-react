import React from 'react'
import { PageMeta, registerMetaForRoute } from '../../utils/head'

// Register metadata for this route
registerMetaForRoute('/about/we', {
	title: "We | Vite + React + TS",
	description: "Learn about our company and our mission",
	keywords: "about us, company, mission, team",
});
const we = () => {
  return (
    <div className='container mx-auto'>
      <div className='w-full h-full bg-red-500'>we</div>
    </div>
  )
}

export default we