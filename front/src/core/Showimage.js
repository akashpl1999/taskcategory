import React from "react";
import { API } from '../config'


const Showimage = ({ item, url }) => (
  <div className="product-img">
{console.log(item)}
 
    <img src={item.subImages[0]} alt={item.name}
      className="mb-3" style={{ maxHeight: "50%", maxWidth: "50%" }} />
  </div>
 
)

export default Showimage;