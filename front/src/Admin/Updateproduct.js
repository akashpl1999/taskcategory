import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
//import { Link, Redirect } from "react-router-dom"
import { getproducts } from "./Apiadmin"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { API } from '../config'


const Upateproduct = () => {


  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [quantity, setquantity] = useState("")
  const [photo, setphoto] = useState("")

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

  const handleChange1 = (e) => { setproductid(e.target.value) }


  const newPostform = () => (
    <form className="mb-3"   >

      <div className="form-group">
        <label className="text-muted">product</label>
        <select value={productid} onChange={handleChange1} className="form-control" name="categories"
        >
          <option>please select</option>
          {productdata && productdata.map((c, i) => (
            <option key={i} value={c._id}>{c.name}</option>
          ))}

        </select>

      </div>





          </form>


  )








  const updateproduct = (e) => {
    e.preventDefault()
    console.log(productid)
    localStorage.setItem("updateid", JSON.stringify(productid))
    const data = { name, productid, description, price, quantity, photo }
    console.log(data)
    axios.put(`http://localhost:5000/products/${productid}/${user._id}`, data, {
      Authorization: `Bearer ${token}`

    })
      .then(response => {
        console.log(response.data)
        alert("deleted Category created")
        history.push("/products/imgupdate")

      })


  }


  const updateform = () => (
    <>
      <input type="text" name="name" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} /><br />

      <input type="text" name="description" placeholder="description" value={description} onChange={(e) => setdescription(e.target.value)} /><br />
      <input type="text" name="price" placeholder="price" value={price} onChange={(e) => setprice(e.target.value)} /><br />
      <input type="text" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => setquantity(e.target.value)} /><br />
      <button className="btn btn-outline-primary" onClick={updateproduct}>update</button><br />
     
    </>

  )


  

  return (
    <Layout title='product view' description='mern task going know'
      className="container col-md-8 offset-md-2">


      <div className='row'>
        <div className='col-md-8 offset-md-2'>

          {newPostform()}
          {updateform()}
            </div>
      </div>

    </Layout>


  )
}

export default Upateproduct;




