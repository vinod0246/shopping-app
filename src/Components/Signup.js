
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {object, string, number}  from "yup"
import axios from "axios"


const SignupValidation=object({
    name:string().min(2).max(40).required('Required'),
    email:string().email().min(5).max(100).required('Required'),
    password:string().min(6).max(15).required('Required')
})



export const Signup=() => {
  const { register, handleSubmit, watch, formState: { errors },} = useForm({
 resolver:yupResolver(SignupValidation)
});

console.log(errors,"errors");

  const onSubmit = (data) =>{     
    console.log(data,"successful data");
    axios({
        method: "POST",
        url: "http://18.183.45.219:3000/api/v1/users/register",
        data: {
            name:data.name,
            email:data.email,
            password:data.password
        }


    }).then((response) =>{
        console.log(response);
 if(response.data.success){
    window.location.href= '/Login'
 }
    }).catch((error) =>{
alert(error)
    })
    
}

  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent : "center",alignItems:"center",height:"60vh"}}>
    
    <form onSubmit={handleSubmit(onSubmit)} style={{width:400, border:"1px solid", padding:50}}>
    <h1>Signup form</h1>  
        
      <div className="from-group" style={{marginBottom:20}} >
    <input {...register("name", { required: true })}placeholder="Name" type="text" className="from-control" />
    <small class="form-text text-danger">{errors['name']?.message}</small>

        </div>  

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
     <a href='/Login'>if you have already have an account?, login here</a>
     </div>
    
    </div>
  );
}