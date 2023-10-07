import React from 'react'
import "./pagination.css"

export default function Panigation({postsPerPage, totalPosts,paginate}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
      }
  return (
    <div>
    <ul className='pagination justify-content-center'>
  
        {pageNumbers.map(number => (
          
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}
         
      </ul>
    </div> 
  )
}
