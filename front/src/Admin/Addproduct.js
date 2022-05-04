import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
import { createProduct, getCategories, getsubCategories } from "./Apiadmin"
import { useHistory } from "react-router-dom"


const Addproduct = () => {


    const [Values, setValues] = useState({
        name: "",
        description: '',
        price: '',
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdproduct: "",
        redirectToProfile: false,
        formData: ""




    })


    const { user, token } = isAuthenticate();
    const [subcategories, getsubcategories] = useState([])
    const [categoriesdata, setcategoriesdata] = useState([])

    const history = useHistory();

    const [multImage, setMultImage] = useState({})


    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setcategoriesdata(data)
                }
            })
    }



    const init2 = () => {
        getsubCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    getsubcategories(data)
                }
            })
    }


    useEffect(() => {
        init()
        init2()
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {

            case 'category':
                localStorage.setItem("CategoryId", value)
                break;


        }
        setValues({ ...Values, [name]: value })
        console.log(event.target.value)

    }





    
    const handlePhoto = (e) => {
        setValues({ ...Values, photo: e.target?.files[0] });
    }



    const clickSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('name', Values.name);
        formData.append('description', Values.description);
       formData.append('photo', Values.photo);
         formData.append('price', Values.price);
        formData.append('category', Values.category);
        formData.append('subcategory', Values.subcategory);
        formData.append('quantity', Values.quantity);
        formData.append('shipping', Values.shipping)
        for (let i = 0; i < multImage.length; i++) {
            formData.append('multiple_images', multImage[i])
        }


        createProduct(user._id, token, formData)
            .then(res => {
                console.log(res);
                localStorage.setItem("res", JSON.stringify(res.data._id))
                alert("product add ,add subimages")
                history.push("/products/mimg")
            })
            .catch(err => {
                console.log(err);
            });
    }


    const newPostform = () => (
        <form className="mb-3" onSubmit={clickSubmit} encType='multipart/form-data'>
            <h4>Post photo</h4>
            {/* <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handlePhoto} type="file"
                        name="photo" accept="image/*" />
                </label>
            </div> */}


            <div className="form-group">
                <label className="text-muted">name</label>
                <input onChange={handleChange} type="text" className="form-control"
                    name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange} type="textarea" className="form-control"
                    name="description" />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange} type="number" className="form-control"
                    name="price" />
            </div>
            <div className="form-group">
                <label className="text-muted">catagory</label>
                <select onChange={handleChange} className="form-control" name="category"
                >
                    <option>please select</option>
                    {categoriesdata && categoriesdata.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">subcatagory</label>
                <select onChange={handleChange} className="form-control" name="subcategory"
                >
                    <option>please select</option>
                    {subcategories.filter((subcat) => {
                        if (subcat.categories === localStorage.getItem("CategoryId")) {
                            return subcat;
                        }
                    }).map((subcat, index) =>
                        <option value={subcat._id}>{subcat.subcategory}</option>
                    )}

                </select>
            </div>


            <div className="form-group">
                <label className="text-muted">   Quantity</label>
                <input onChange={handleChange} type="number" className="form-control"
                    name="quantity" />
            </div>


            <div className="form-group">
                <label className="text-muted">shipping</label>
                <select onChange={handleChange} className="form-control" name="shipping" >
                    <option value="0">No</option>
                    <option value="1">yes</option>

                </select>
            </div>

            <button className="btn btn-outline-primary">create Product</button>

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

export default Addproduct;