import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
//import { Link, Redirect } from "react-router-dom"
import { getproducts } from "./Apiadmin"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { API } from '../config'


const Imgupdate = () => {


  
  const [productdata, setproductdata] = useState("")

  const history = useHistory();
  const [productid, setproductid] = useState("")
  const [multImage, setMultImage] = useState({})


  const handleMultPhoto = (e) => {
      setMultImage(e.target.files);
      console.log(e.target.files)
  }



  // const [getdata, setgetdata] = useState([])

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



  const submitMultImage = () => {
    console.log(productid)
    let formData = new FormData()
    for (let i = 0; i < multImage.length; i++) {
        formData.append('multiple_images', multImage[i])
    }
    formData.append('proid', productid)
    console.log(formData);
    axios.post(`http://localhost:5000/products/${productid}/${user._id}`,formData) 
    .then(res => {
        console.log(res.data);

        alert("done")
       
    })
}







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
      <div className="form-group">
                <label className="btn btn-secondary">
                    <input  type="file"  accept=".png, .jpg, .jpeg"  name="multiple_images" multiple  onChange={handleMultPhoto} />
                </label>
            </div>

            <button onClick={submitMultImage}>Submit</button>
    





          </form>


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

export default Imgupdate;




