import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
//import { } from "./Apiadmin"
import axios from "axios"


const Mullimage = () => {

    const [multImage, setMultImage] = useState({})


    const handleMultPhoto = (e) => {
        setMultImage(e.target.files);
        console.log(e.target.files)
    }



    const submitMultImage = () => {
        let idproduct = JSON.parse(localStorage.getItem("res"))
        let formData = new FormData()
        for (let i = 0; i < multImage.length; i++) {
            formData.append('multiple_images', multImage[i])
        }
        formData.append('proid', idproduct)
        console.log(formData);
        axios.post(`http://localhost:5000/products/mimg`,formData) 
        .then(res => {
            console.log(res.data);

            alert("done")
           
        })
    }
    
       

        

    


    const newPostform=()=>(
                <form className="mb-3"  encType='multipart/form-data'>
          
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input  type="file"  accept=".png, .jpg, .jpeg"  name="multiple_images" multiple  onChange={handleMultPhoto} />
                </label>
            </div>

            <button onClick={submitMultImage}>Submit</button>
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

export default Mullimage;