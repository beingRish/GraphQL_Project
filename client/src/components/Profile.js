import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_MY_PROFILE } from '../gqlOperations/queries'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const {loading, error, data} = useQuery(GET_MY_PROFILE)
  if(loading) return <h2>Profile is loading</h2>
  if(!localStorage.getItem("token")) {
    navigate("/login")
    return <h1>unauthorized</h1>
  }
  if(error) {
    console.log(error.message)
  }
  return (
    <div className='container my-container'>
      <div className='center-align'>
        <img className='circle' style={{ border: "2px solid", marginTop: "10px" }} src={`https://robohash.org/${data.user.firstName}.png?size=200x200`} alt='pic' />
        <h5>{data.user.firstName} {data.user.lastName}</h5>
        <h5>Email - {data.user.email}</h5>
      </div>
      <h3>Your quotes</h3>
      {
        data.user.quotes.map(quote => {
          return (
            <blockquote>
              <h6>{quote.name}</h6>
            </blockquote>
          )
        })
      }
    </div>
  )
}
