// import React,{ useState } from 'react'
// import Layout from '../core/Layout'



// const SubCategory=()=>{






   
// return (


//     <Layout title='add Sub category' description='mern task going know'
//       className="container col-md-8 offset-md-2">


//          <div className='row'>
//              <div className='col-md-8 offset-md-2'>


                 
//             </div>
//          </div>

//       </Layout>
     

//   )
// }

// export default SubCategory;
import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
import { Link, Redirect } from "react-router-dom"
import { subcreateCategory,getCategories } from "./Apiadmin"
import axios from "axios"



const SubCategory = () => {

    const [data,setData]=useState({
        subcategory:'',
    
    })
    const[categories,setcategories]=useState([])
    const { user, token } = isAuthenticate();


    const handleChange=(event)=>{
        const {name,value}=event.target;   
        setData({...data,[name]:value})
        console.log(data)
    }

   
    const init=()=>{
        getCategories()
        .then(data1=>{
           if(data1.error){
               console.log(data1.error)
           }else{
                
        
             console.log(data1)
             setcategories(data1)
             
        }
        })
     }
    
    
        useEffect(()=>{
          init()   
        },[])


        const clickSubmit=(event)=>{
            event.preventDefault()
            console.log(data)
         
         axios.post("http://localhost:5000/subcategory/create" ,data)
            .then(data1=>{
                if(data1.error){
                     console.log(data1.error)   
                 }else{

                    console.log(data1)
                   alert("product added")
          
                }
            })
          
          }
          
    

    const newPostform = () => (
        <form className="mb-3"  onSubmit={clickSubmit} >
            
             <div className="form-group">
                <label className="text-muted">catagory</label>
                <select onChange={handleChange} className="form-control" name="categories"
                >
                    <option>please select</option>
                    {categories && categories.map((c,i)=>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">name</label>
                <input onChange={handleChange} type="text" className="form-control" name="subcategory"
                     />
            </div>
           
           
          
            <button className="btn btn-outline-primary">create Product</button>

        </form>


    )


    return (
        <Layout title='add new product' description='mern task going know'
            className="container col-md-8 offset-md-2">


            <div className='row'>
                <div className='col-md-8 offset-md-2'>

                    {newPostform()}

                     
                </div>
            </div>

        </Layout>


    )
}

export default SubCategory;