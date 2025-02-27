import React from 'react'
import { PageMeta, registerMetaForRoute } from '../utils/head'

// Register metadata for this route
registerMetaForRoute('/contact', {
	title: "Contact Us | Vite + React + TS",
	description: "Contact us for more information",
	keywords: "contact us, information, support"
});

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <p>This is the contact page</p>
    </div>
  )
}

export default Contact