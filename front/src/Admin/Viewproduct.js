import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
import { Link, Redirect } from "react-router-dom"
import { getproducts } from "./Apiadmin"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { API } from '../config'


const Viewproduct = () => {

 
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [quantity, setquantity] = useState("")
  const [photo, setphoto] = useState("")
  // const{name,description,price,quantity}=Values

  const [productdata, setproductdata] = useState("")

  const history = useHistory();
  const [productid, setproductid] = useState("")


  const [getdata, setgetdata] = useState([])

  const { user, token } = isAuthenticate();

  const init = () => {
    getproducts()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data)
          setproductdata(data)



        }
      })
  }


  useEffect(() => {
    init()
  }, [])

  //  const updatehandle=(event)=>{
  //    const{name,value}=event.target;
  //    setValues({...Values,[name]:value})
  //  }  
  const handleChange1 = (e) => { setproductid(e.target.value) }

  const clickSubmit = (event) => {
    event.preventDefault()


    console.log(productdata)
    console.log(productid)

    axios.get(`http://localhost:5000/products/${productid}`)
      .then(response => {
        console.log(response.data)
        localStorage.setItem("productdata", JSON.stringify(response.data))
        setgetdata([response.data])
        console.log(getdata)



      })

  }

  const newPostform = () => (
    <form className="mb-3">

      <div className="form-group">
        <label className="text-muted">product</label>
        <select value={productid} onChange={handleChange1} className="form-control" name="categories"
        >
          <option>please select</option>
          {productdata && productdata.map((c, i) => (
            <option key={i} value={c._id}>{c.name}</option>
          ))}

        </select>

        <div>
          {
            
            
            
            getdata.map((elm) => {
              return (
                <>

                  <input type="text" placeholder="id" value={elm._id} /><br />
                  <img src={`${API}${elm.photo}`} style={{ maxHeight: "50%", maxWidth: "50%" }} /><br />

                  <input type="text" placeholder="name" value={elm.name} /><br />
                  <input type="text" placeholder="description" value={elm.description} /><br />
                  <input type="text" placeholder="price" value={elm.price} /><br />
                  <input type="text" placeholder="category" value={elm.category} /><br />
                  <input type="text" placeholder="subcategory" value={elm.subcategories} /><br />
                  <input type="text" placeholder="quantity" value={elm.quantity} /><br />
                   <img src={elm.subImages[0]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
                   <img src={elm.subImages[1]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
                   <img src={elm.subImages[2]} style={{ maxHeight: "50%", maxWidth: "50%" }} ></img>
                   <img src={elm.subImages[3]} style={{ maxHeight: "50%", maxWidth: "50%" }}></img>

                </>
              )

            })
          }

        
       
        










          




        </div>
      </div>

      




      <button className="btn btn-outline-primary" onClick={clickSubmit}>view Product</button>
      <button className="btn btn-outline-primary" onClick={deleteproduct}>Delete</button>
      <Link to="/products/update">update</Link>

    </form>


  )


  const deleteproduct = (e) => {
    e.preventDefault()
    console.log(productid)
    const data = { productid }
    axios.delete(`http://localhost:5000/products/${productid}/${user._id}`, data, {
      Authorization: `Bearer ${token}`

    })
      .then(data => {
        if (data.error) {
          console.log(data.error)

        } else {
          console.log(data)
          alert(" product deleted")
        }
      })


  }






  const updateproduct = (e) => {
    e.preventDefault()
   

  }


  const updateform = () => (
    <>
      <input type="text" name="name" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} /><br />

      <input type="text" name="description" placeholder="description" value={description} onChange={(e) => setdescription(e.target.value)} /><br />
      <input type="text" name="price" placeholder="price" value={price} onChange={(e) => setprice(e.target.value)} /><br />
      <input type="text" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => setquantity(e.target.value)} /><br />
      {/* <input onChange={(e)=>setphoto(e.target.files[0])} type="file"
                        name="photo" accept="image/*" /><br/>
                  */}
      <button className="btn btn-outline-primary" href="/products/update">update</button><br />

    </>

  )




  return (
    <Layout title='product view' description='mern task going know'
      className="container col-md-8 offset-md-2">


      <div className='row'>
        <div className='col-md-8 offset-md-2'>

          {newPostform()}
        </div>
      </div>

    </Layout>


  )
}

export default Viewproduct;




