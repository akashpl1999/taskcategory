import React,{ useState,useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { getsubCategories} from './Apiadmin'
import axios from 'axios'



const Deletesubcat=()=>{

   const[values,setValues]= useState({
       categories:[],
       error:'', 
       formData:''
   })

   
   const[name,setname]=useState('')

   const [categorydata,setcategorydata]=useState("")

   const{categories}=values


   const {user,token}=isAuthenticate();



const init=()=>{
    getsubCategories()
    .then(data=>{
       if(data.error){
           setValues({...values,error:data.error})
       }else{
             setValues({...values, 
                categories:data,  
                formData:new FormData()})
                

                }
    })
 }


    useEffect(()=>{
      init()   
    },[])

 
   

   
        const handleChange1 = (e) => { setcategorydata(e.target.value) }



    const newCategoryform=()=>(
        <form  >
            <div className="form-group">
                    <label className="text-muted">catagory</label>
                    <select value={categorydata} onChange={handleChange1} className="form-control"
                    >
                        <option>please select</option>
                        {categories && categories.map((c,i)=>(
                            <option key={i} value={c._id}>{c.subcategory}</option>
                            

                            ))}
                            
                            </select>
    
                            <input type="text" onChange={(e)=>setname(e.target.value)}></input>
                            <button onClick={updatecategory}>Update</button>
                   
                    
                </div>
     
        </form>
    )
    
    
    

         const updatecategory=(e)=>{
            e.preventDefault()
            setcategorydata(JSON.parse(localStorage.getItem('catid')))
            console.log(categorydata)
            console.log(name)
            const data={name,categorydata}
           axios.put(`http://localhost:5000/subcategory/${categorydata}/${user._id}`,data,{
            Accept:'application/json',
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
    
            })
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                   
                }else{
                    console.log(data)
                    alert("deleted Category created")
                }
            })
           
        
        }
        

       
       







return (


    <Layout title='add new category' description='mern task going know'
      className="container col-md-8 offset-md-2">


         <div className='row'>
             <div className='col-md-8 offset-md-2'>
                 {newCategoryform()}
                  
                  
                 </div>
         </div>

      </Layout>
     

  )
}

export default Deletesubcat;










// const clicksubmit=(e)=>{
//     e.preventDefault()
//     setcategorydata(JSON.parse(localStorage.getItem('category')))
//     console.log(categorydata)
//     UpdateCategory(user._id,token,{name},categorydata._id)
//     .then(data=>{
//         if(data.error){
//             seterror(true)
//         }else{
//             seterror("")
//             setsuccess(true)
//             console.log(data)
//             localStorage.setItem("category",JSON.stringify(data))
//             alert("updated Category created")
//         }
//     })

// }

// const deletecategory=(e)=>{
//     e.preventDefault()
//     setcategorydata(JSON.parse(localStorage.getItem('category')))
//     console.log(categorydata)
   
//     DeleteCategory(user._id,token,{name},categorydata._id)
//     .then(data=>{
//         if(data.error){
//             seterror(true)
//         }else{
//             seterror("")
//             setsuccess(true)
//             console.log(data)
//             //localStorage.setItem("category",JSON.stringify(data))
//             alert("deleted Category created")
//         }
//     })
   

// }









