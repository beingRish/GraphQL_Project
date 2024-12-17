import React from 'react'

export default function Profile() {
  return (
    <div className='container my-container'>
      <div className='center-align'>
        <img className='circle' style={{ border: "2px solid", marginTop: "10px" }} src='https://robohash.org/ram.png?size=200x200' alt='pic' />
        <h5>Rishabh Singh</h5>
        <h5>Email - being@rish.com</h5>
      </div>
      <h3>Your quotes</h3>
      <blockquote>
        <h6>if it works don't touch it</h6>
      </blockquote>
      <blockquote>
        <h6>if it works don't touch it</h6>
      </blockquote>
    </div>
  )
}
