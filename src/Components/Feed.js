import { useState, useEffect } from "react";
import  axios from "axios";

export const Feed = ()=>{

    const [products, setProducts] = useState([]); //total products
    const [cartProducts, setCartProducts] = useState([]); //cart added total

    const loadProducts= () =>{
        const token= localStorage.getItem("SHOPPING_TOKEN");
        axios({
            method:'GET',
            url:"http://18.183.45.219:3000/api/v1/products",
           headers: {
            "X-Authorization": 'Bearer ${token}'
           }
        }).then((response) =>{
            setProducts(response.data);
        }).catch((error) =>{

        })

    }

    const loadcart= () =>{
        const cart_Id = localStorage.getItem("SHOPPING-CART_ID");
        const token = localStorage.getItem("SHOPPING_TOKEN");
        axios({
            method: "GET",
            url:"http://18.183.45.219:3000/api/v1/carts/${cart_Id}",
            headers: {
            "X-Authorization": 'Bearer ${token}'
           }
        }).then((res) =>{
            setCartProducts(res.data);
        }).catch((err)=>{
console.log(err);
        })
    }
    useEffect(() =>{
        loadProducts()
        loadcart()
    },[])

    const addToCart = (product_id) =>{
const productID= product_id;
const cart_Id = localStorage.getItem("SHOPPING-CART_ID");
 const token = localStorage.getItem("SHOPPING_TOKEN");

 axios({
    method : "POST",
    url: "http://18.183.45.219:3000/api/v1/carts/${cart_Id}",
headers: {
            "X-Authorization": 'Bearer ${token}'
        },
        data:{
            id:productID,
            "quantity": 1
        }
 }).then((res) =>{
    console.log(res.data);
 }).catch((err) =>{
console.log(err);
 })
}   

const cartProuctIds= cartProducts.map((prod) => prod.id);
console.log(cartProuctIds);

    return(
        <>
<h1>Products visible here</h1>
<button className="btn btn-danger" onClick={()=> {
    localStorage.removeItem("SHOPPING_TOKEN")
    localStorage.removeItem("SHOPPING-CART_ID")
    window.location.href="/Login"
}}>Logout</button>

<div style={{display:"flex", flexWrap: 'wrap'}}>
{
    products.map((products,index) =>{
return(
<div key={index}className="card" style={{width: '18rem', height:500, margin: 10}}>
  <img className="card-img-top" style={{height:200}} src={products.images ? products.images[0]:''} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">products.title</h5>
    <p className="card-text">{products.description}</p>
    <p className="card-text">{products.price}</p>
    {
        cartProuctIds.includes(products.id) ? ( 
<button className="btn btn-success">Added</button>
        ) :(
<button className="btn btn-primary" onClick={() =>{
addToCart(products.id)
 }}>Add to cart</button>
        )
    }
 
  </div>
</div>)
    })
}
</div>

</>
    )
}