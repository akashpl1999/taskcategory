import { API } from "../config";

export const createCategory =(userId,token,category)=>{
    return fetch(`${API}category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
      .then(response=>{
          return response.json()
      })
      .catch(err=>{
          console.log(err)
      })

    
    }

    

    export const subcreateCategory =(userId,token,subcategory)=>{
        return fetch(`${API}subcategory/create/${userId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                  },
            body:subcategory
        })
          .then(response=>{
              return response.json()
          })
          .catch(err=>{
              console.log(err)
          })
    
        
        }
    
    

    export const UpdateCategory =(categoryId,category)=>{
        return fetch(`${API}category/${categoryId}`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
                },
            body:JSON.stringify(category)
        })
          .then(response=>{
              return response.json()
          })
          .catch(err=>{
              console.log(err)
          })
    
        
        }
    
        export const DeleteCategory =(userId,token,category,categoryId)=>{
            return fetch(`${API}category/${categoryId}/${userId}`,{
                method:'DELETE',
                headers:{
                    Accept:'application/json',
                    'Content-Type':"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(category)
            })
              .then(response=>{
                  return response.json()
              })
              .catch(err=>{
                  console.log(err)
              })
        
            
            }
       


    export const createProduct =(userId,token,product)=>{
        return fetch(`${API}product/create/${userId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                 Authorization:`Bearer ${token}`
            },
            body:product
        })
          .then(response=>{
              return response.json()
          })
          .catch(err=>{
              console.log(err)
          })
    
        
        }
    
    
export const getCategories=()=>{
    return fetch(`${API}categories`,{
         method:"GET"

    })
    .then(response=>{
        return response.json();

    })
    .catch(err=> console.log(err))
}

export const getsubCategories=()=>{
    return fetch(`${API}subcategories`,{
         method:"GET"

    })
    .then(response=>{
        return response.json();

    })
    .catch(err=> console.log(err))
}


export const getproducts=()=>{
    return fetch(`${API}products`,{
         method:"GET"

    })
    .then(response=>{
        return response.json();

    })
    .catch(err=> console.log(err))
}




export const getproductsdata =(productid)=>{
    return fetch(`${API}products/${productid}`,{
        method:'GET'
       })
      .then(response=>{
          return response.json()
      })
      .catch(err=>{
          console.log(err)
      })



    }
































    
// export const isAuthenticate=()=>{
//     if(typeof window == 'undefined'){
//     return false
//     }
//     if(localStorage.getItem('signin')){
//         return JSON.parse(localStorage.getItem("signin"))
//     }else{
//         return false
//     }
// }

// export  const signinry = user  => (

//     axios.post("http://localhost:5000/signin", user)
//         .then(response => {
//             localStorage.setItem('signin', JSON.stringify(response.data));
//             alert("added")
           
//         })
//         .catch(err => {
//             console.log(err)
//             alert("error")
//         })
//
