import React,{ useState,useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { getsubCategories} from './Apiadmin'
import axios from 'axios'



const Deletesubcat=()=>{

   const[values,setValues]= useState({
       subcategories:[],
       error:'', 
       formData:''
   })

   
   //const[name,setname]=useState('')

   const [subcategorydata,setsubcategorydata]=useState("")

   const{subcategories}=values


   const {user,token}=isAuthenticate();



const init=()=>{
    getsubCategories()
    .then(data=>{
       if(data.error){
           setValues({...values,error:data.error})
       }else{
             setValues({...values, 
                subcategories:data,  
                formData:new FormData()})
                

                }
    })
 }


    useEffect(()=>{
      init()   
    },[])

 
   

   
        const handleChange1 = (e) => { setsubcategorydata(e.target.value) }



    const newCategoryform=()=>(
        <form  >
            <div className="form-group">
                    <label className="text-muted">catagory</label>
                    <select value={subcategorydata} onChange={handleChange1} className="form-control"
                    >
                        <option>please select</option>
                        {subcategories && subcategories.map((c,i)=>(
                            <option key={i} value={c._id}>{c.subcategory}</option>
                            

                            ))}
                            
                            </select>
    
                            <button onClick={deletecategory}>delet</button>
                   
                    
                </div>
     
        </form>
    )
    
    
    

         const deletecategory=(e)=>{
            e.preventDefault()
            console.log(subcategorydata)
            const data={subcategorydata}
           axios.delete(`http://localhost:5000/subcategory/${subcategorydata}/${user._id}`,data,{
            Authorization:`Bearer ${token}`
    
            })
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                   
                }else{
                    console.log(data)
                    alert("deleted subCategory created")
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














