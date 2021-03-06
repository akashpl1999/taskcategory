import React from 'react'
import Menu from './Menu';
import '../Style.css'

 const Layout=({title="Title", description="Description", 
 className,children})=> {
  return (
      <>
      
       <Menu/>
      
    <div>
        <div className='jumbotron'>
            <h2>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>

    </div>
    </>
  )
}
export default Layout;