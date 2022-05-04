import React, { useState, useEffect,useRef} from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
import { getCategories, getsubCategories } from "./Apiadmin"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Deletecategory } from "../config/Myservice"

const Viewcat = () => {


    const SubcatInput=useRef(null);
   
    const [subcategories, getsubcategories] = useState([])
    const [categoriesdata, setcategoriesdata] = useState([])

    const [subcatId, setSubCatId] = useState([])
    const [subcat, setSubCat] = useState([]);



    const { user, token } = isAuthenticate();

    const history = useHistory();



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
                    console.log(data)
                }
            })
    }


    useEffect(() => {
        init()
        init2()
    }, [])


    const DeleteData = (subcatId) => {
        axios.delete(`http://localhost:5000/subcategory/${subcatId}/${user._id}`, {
            Authorization: `Bearer ${token}`

        })
            .then(data => {
                if (data.error) {
                    console.log(data.error)

                } else {
                    console.log(data)
                    alert("deleted subCategory created")
                    window.location.reload();

                }
            })


    }


    const UpdateData = (subcatId, category) => {
        console.log(subcatId, category)
        setSubCat(category)
        setSubCatId(subcatId)
    }

    const DeleteCategory=(CatId)=>{
        console.log(CatId)
        Deletecategory({categories:CatId})
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                   alert("done")  
                   window.location.reload();

                }
            })
   
     
    }
    



    const editdata = (e) => {
        e.preventDefault();
        let data={subcategory:SubcatInput.current.value,subcatId:subcatId}
        console.log(data)
        axios.put(`http://localhost:5000/subcategory/${subcatId}/${user._id}`,data, {
            Accept: 'application/json',
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`


        })
            .then(data => {
                if (data.error) {
                    console.log(data.error)

                } else {
                    console.log(data.data)
                    alert("deleted Category created")
                    window.location.reload();

                }
            })

    }






    return (
        <>

             <Layout/>


            <div class="container">
                {
                    categoriesdata.map((elm, ind) =>
                        <div className="container">

                            <h2>{elm.name}</h2>

                            <table class="table table-striped">
                                <thead>
                                    <tr >
                                        <th>sr No</th>
                                        <th>SubCategory Name</th>
                                    </tr>
                                </thead>
                                {subcategories.filter((subcat) => {
                                    if (elm._id == subcat.categories) {
                                        return subcat;
                                    }
                                }).map((subcat, index) =>
                                    <tbody>
                                        <tr >
                                            <td>{index + 1}</td>
                                            <td>{subcat.subcategory}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => DeleteData(subcat._id)} >Delete</button>
                                                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick={() => UpdateData(subcat._id, subcat.subcategory)} >update</button></td>





                                        </tr>

                                    </tbody>



                                )}



                            </table>
                            <div>
                            <button  className=" text-center btn btn-danger" onClick={()=>DeleteCategory(elm._id)} >&nbsp;Delete Category <i class="fa fa-trash-o"></i></button> 
                   
                                
                            </div>

                        </div>

                        


                    )

                     
                }
            </div>

              



         
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Modal Header</h4>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={editdata}>
                        <div class="form-group">
                     <label for="cc-number" class="control-label">Subcategory Name</label>
                      <input  type="text" class="input-lg form-control" name="subcategory"  ref={SubcatInput} defaultValue={subcat} required/> </div>
                        <div className='text-center'>
                     <button variant="success" type='submit'  style={{marginTop:'20px'}} >Update Subcategory</button>
                     </div>
                        </form>
            
                            
                             </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
















        </>

    )






}






export default Viewcat;


// axios.delete(`http://localhost:5000/category/${CatId}/${user._id}`,data,{
//     headers:{"Authorization":`Bearer ${token}`}
// })
//     .then(data=>{
//         if(data.error){
//             console.log(data.error)
           
//         }else{
//             console.log(data)
//             alert("deleted Category created")
//         }
//     })
   
