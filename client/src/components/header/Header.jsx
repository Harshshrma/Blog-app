import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <section className='header'>
        <div className="headerTitles">
              <Link to="/write">
            <button className='headerButton'>

              Write Now</button>
              </Link>
        </div>
    </section>
    </>
  )
}
