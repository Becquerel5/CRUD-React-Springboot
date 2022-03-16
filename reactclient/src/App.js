import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App()  {
 const[info,setInfo] = useState({
    firstName:"",
    lastName:"",
    emailId:""
 });

 const [employees,setEmployees]= useState([]);

 const handleChange =({currentTarget})=>{
    const {value,name} = currentTarget;
    setInfo({...info,[name]: value});
 };

 useEffect(() => {
  axios.get("http://localhost:8080/api/employees")
   //.then(response=>console.log(response.data));
   .then(response=>response.data)
   .then(data=>setEmployees(data));
 }, []);
 
const handleSubmit = async (event) =>{
  event.preventDefault();
  try {
    await axios.post("http://localhost:8080/api/employees/" ,info);
    setEmployees([...employees,{info}]);
   //toast successful
  } catch (error) {
    console.log(error.response);
    //toast erro
  }
};



  return ( 
    <div className="App">
      <h1><u>Welcome to Becquerel CRUD_REACT_SPRING</u></h1>

      <div className='container style1'>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="fistName">fistName:</label>
          <input type="text" value={info.firstName} className="form-control" name='firstName' onChange={handleChange}/>
        </div>
        <div className="form-group ">
          <label htmlFor="lastName">lastName:</label>
          <input type="text" value={info.lastName} className="form-control" name='lastName' onChange={handleChange}/>
        </div>
        <div className="form-group ">
          <label htmlFor="emailId">emailId:</label>
          <input type="email" value={info.emailId} className="form-control" name='emailId' onChange={handleChange}/>
        </div>
        <div className="form-group mt-2">
        <button type="submit" className="btn btn-success" >Submit</button>&nbsp;
        <button type="reset" className="btn btn-primary">Reset</button>
        </div>
      </form>
      </div>

      <hr/>

    <div className='form-control'>
      <table className='table table-hover'>
              <thead>
                  <tr>
                      <th className='text-danger text-64'>id</th>
                      <th>FistName</th> 
                      <th>LastName</th>
                      <th>Email</th>
                      <th className='text-center'>Action</th>
                      
                  </tr>
              </thead>

              <tbody>
                {employees.map(employee=><tr key={employee.id}>
                    <td className='text-danger text-32'>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.emailId}</td>
                    <td>
                      <button type='' className='btn btn-sm btn-danger'>supprimer</button>
                    </td>
                      
                </tr>)}
                
              </tbody>
        </table>
    </div>

    </div>
   );
}
 
export default App;