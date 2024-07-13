import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {object, string, number}  from "yup";
import axios from 'axios';


const LoginValidations=object({
    email:string().email().min(5).max(100).required('Required'),
    password:string().min(6).max(15).required('Required')
})



export const Login=() => {
  const { register, handleSubmit, watch, formState: { errors },} = useForm({
 resolver:yupResolver(LoginValidations)
});

console.log(errors,"errors");

  const onSubmit = (data) =>{
    console.log(data,"valid data");
    axios({
      method: "POST",
      url:"http://18.183.45.219:3000/api/v1/users/login",
      data: {
email:data.email,
password:data.password
      }
    }).then((response) =>{
console.log(response.data.token);
localStorage.setitem("SHOPPING_TOKEN",response.data.token )
localStorage.setitem("SHOPPING_CART_ID",response.data.cart_id )
window.location.href= '/feed'

    }).catch((error) =>{
console.log(error);
    })
}

  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent : "center",alignItems:"center",height:"60vh"}}>
    
    <form onSubmit={handleSubmit(onSubmit)} style={{width:400, border:"1px solid", padding:50}}>
      <h1>Login form</h1>  
      
      <div className="from-group" style={{marginBottom:20}}>
     <input {...register("email", { required: true })}placeholder="Email" type="email" className="from-control"  />
        <small class="form-text text-danger">{errors['email']?.message}</small>
        </div>

     <div className="from-group" style={{marginBottom:20}}>
     <input {...register("password", { required: true })}placeholder="Password" type="password" className="from-control"  />
     <small class="form-text text-danger">{errors['password']?.message}</small>
     </div>

     <div><input type="submit" className="btn btn-primary" /></div>
    </form>
    <div>
     <a href='/Signup'>if you have don't have an account?, Signup here</a>
     </div>
    </div>
  );
}