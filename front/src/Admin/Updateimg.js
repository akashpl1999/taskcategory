// import React, { useState, useEffect } from "react"
// import Layout from "../core/Layout"
// import { isAuthenticate } from "../Auth"
// import { Link, Redirect } from "react-router-dom"
// import { getproducts } from "./Apiadmin"
// import axios from "axios"
// import { useHistory } from "react-router-dom"
// import { API } from '../config'


// const Updateimg = () => {

//   const [photo, setphoto] = useState("")
//   // const{name,description,price,quantity}=Values

//   const [productdata, setproductdata] = useState("")

//   const history = useHistory();
//   const [productid, setproductid] = useState("")


//   const [getdata, setgetdata] = useState([])

//   const { user, token } = isAuthenticate();

//   const init = () => {
//     getproducts()
//       .then(data => {
//         if (data.error) {
//           console.log(data.error)
//         } else {
//           console.log(data)
//           setproductdata(data)



//         }
//       })
//   }


//   useEffect(() => {
//     init()
//   }, [])

//   const handleChange1 = (e) => { setproductid(e.target.value) }

//   const clickSubmit = (event) => {
//     event.preventDefault()


//     console.log(productdata)
//     console.log(productid)

//     axios.get(`http://localhost:5000/products/${productid}`)
//       .then(response => {
//         console.log(response.data)
//         localStorage.setItem("productdata", JSON.stringify(response.data))
//         setgetdata([response.data])
//         console.log(getdata)



//       })

//   }

//   const newPostform = () => (
//     <form className="mb-3">

//       <div className="form-group">
//         <label className="text-muted">product</label>
//         <select value={productid} onChange={handleChange1} className="form-control" name="categories"
//         >
//           <option>please select</option>
//           {productdata && productdata.map((c, i) => (
//             <option key={i} value={c._id}>{c.name}</option>
//           ))}

//         </select>

//         <div>
//           {
            
            
            
//             getdata.map((elm) => {
//               return (
//                 <>

//                    <img src={elm.subImages[0]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
//                    <img src={elm.subImages[1]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
//                    <img src={elm.subImages[2]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
//                    <img src={elm.subImages[3]} style={{ maxHeight: "50%", maxWidth: "50%" }}></img>

//                 </>
//               )

//             })
//           }

//         </div>
//       </div>

//    <button className="btn btn-outline-primary" onClick={clickSubmit}>view Product</button>
    
//     </form>


//   )


//   const updateimg=()=>{





// }

  
  


//   return (
//     <Layout title='product view' description='mern task going know'
//       className="container col-md-8 offset-md-2">


//       <div className='row'>
//         <div className='col-md-8 offset-md-2'>



//           {newPostform()}


        
        
        
//         </div>

//       </div>

//     </Layout>


//   )
// }

// export default Updateimg;




