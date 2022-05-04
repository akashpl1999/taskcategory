// import React, { useState, useEffect } from "react"
// import Layout from "../core/Layout"
// import { isAuthenticate } from "../Auth"
// import axios from "axios"


// const Productupdate = () => {

//     const [photo, setphoto] = useState("")


//     const clickSubmit = (event) => {
//         event.preventDefault()
//         const formData = new FormData();
//         formData.append('photo',  photo );
//     }

//     const update = () => {
//         let prodid = JSON.parse(localStorage.getItem("proid"))
//         console.log(prodid)
//         axios.get(`http://localhost:5000/products/${prodid}`)
//             .then(data => {
//                 setdata(data)
//                 console.log(data)
//             })

//     }

//     useEffect(()=>{
//         update()

//     },[])
//     const viewdata=()=>{
//        {console.log(data)}
//         <div>
//             {
//                 data.map(elm=>{
//                     return <h1>{elm.name}</h1>
//                 })
//             }
            
//         </div>
//          }

        
//     return (
//         <Layout title='product view' description='mern task going know'
//             className="container col-md-8 offset-md-2">


//             <div className='row'>
//                 <div className='col-md-8 offset-md-2'>
//                       </div>
//             </div>

//         </Layout>


//     )

// }
// export default Productupdate;
