import './App.css';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from './Auth/PrivateRoutes'
import Home from "./core/Home";
import Dashboard from './user/Userdash'
import Admindash from './user/Admindash';
import AddCategory from './Admin/AddCategory';
import Addproduct from './Admin/Addproduct'
import Shop from './core/Shop'
import UpdateCategorys from './Admin/UpdateCategorys'
import Deletecategorys from './Admin/Deletecategorys';
//import Productmuter from './Admin/Productmuter';
import SubCategory from './Admin/SubCategory';
import Deletesubcat from './Admin/Deletesubcat';
import Updatesubcat from "./Admin/Updatesubcat"
import Viewproduct from "./Admin/Viewproduct"
import Mullimage   from "./Admin/Mullimage"
import Productupdate from "./Admin/Produpdate"
import Upateproduct from './Admin/Updateproduct';
import Imgupdate from "./Admin/Imgupdate"
import Viewcat from './Admin/Viewcat';
import Updateimg from './Admin/Updateimg';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <Admindash path='/admin/dashboard' exact component={Admindash} />
         
        <Route path='/create/category' exact component={AddCategory} />
          <Route path='/subcategory/create' exact component={SubCategory} />
           <Route path='/subcategory/delete' exact component={Deletesubcat} />
          <Route path='/subcategory/update' exact component={Updatesubcat} />
          <Route path='/product/view'  exact component={Viewproduct}/>
          <Route path='/category/view'  exact component={Viewcat}/>
        
          <Route path='/product/updateimg'  exact component={Updateimg}/>
        
          <Route path='/create/product' exact component={Addproduct} />
          <Route path='/product/update' exact component={Productupdate} />
          <Route path='/products/mimg' exact component={Mullimage} />
          <Route path='/products/update' exact component={Upateproduct} />
          <Route path='/products/imgupdate' exact component={Imgupdate} />
       
        <Route path='/category/delete' exact component={UpdateCategorys} />
        <Route path='/category/update' exact component={Deletecategorys} />
       
         <Route path='/shop' exact component={Shop} />
        
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          </Switch>
      </BrowserRouter>



    </div>
  );
}

export default App;
