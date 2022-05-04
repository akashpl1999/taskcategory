import React,{ useState,useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { UpdateCategory , getCategories} from './Apiadmin'
import axios from 'axios'



const UpdateCategorys=()=>{

   const[values,setValues]=useState({
       categories:[],
       error:'',
       formData:''
   })

   const [categorydata,setcategorydata]=useState("")

   const{categories,error,formData}=values


   const {user,token}=isAuthenticate();



const init=()=>{
    getCategories()
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



    
    const handleChange=name=>event=>{
        const value=name=== event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
        }

        const handleChange1 = (e) => { setcategorydata(e.target.value) }



    const newCategoryform=()=>(
        <form >
            <div className="form-group">
                    <label className="text-muted">catagory</label>
                    <select value={categorydata} onChange={handleChange1} className="form-control"
                    >
                        <option>please select</option>
                        {categories && categories.map((c,i)=>(
                            <option key={i} value={c._id} >{c.name}{localStorage.setItem("catid",JSON.stringify(c._id))}</option>

                            ))}
                            
                    </select>
    
                
                    
                </div>
     
        </form>
    )
    
     
    
    

    
         const deletecategory=(e)=>{
            e.preventDefault()
            console.log(categorydata)
           axios.delete(`http://localhost:5000/category/${categorydata}/${user._id}`,{
            headers:{"Authorization":`Bearer ${token}`}
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
        

       
        const deleteaction=()=>(
            <button onClick={deletecategory}>delete</button>
        )








return (


    <Layout title='add new category' description='mern task going know'
      className="container col-md-8 offset-md-2">


         <div className='row'>
             <div className='col-md-8 offset-md-2'>
                 {newCategoryform()}
                  {deleteaction()}
                  
                  
                 </div>
         </div>

      </Layout>
     

  )
}

export default UpdateCategorys;










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









