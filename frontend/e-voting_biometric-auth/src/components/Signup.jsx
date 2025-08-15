import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

import './Signup/Signup.css';
import Modal from './Others/Modal';

const Signup = () => {
  const [template, setTemplate] = useState();
  const [fpColor, setFPColor] = useState("#2e2e2e");
  const [step, setStep] = useState(1);
  const [statusMessage, setStatusMessage] = useState("Click start to begin");
  const maxStep = 2;

  const colors = {
    green: "#18ec18",
    blue: "#0ea5e9",
    red: "#fc2e0a",
    black: "#2e2e2e"
  }

  const [formData, setFormData] = useState({
    f_name: '',
    l_name:'',
    email:'',
    password:'',
    template:''
  });

  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  }

  const scan = async(e)=>{
    e.preventDefault();
    setFPColor(colors.blue)

    const res = await fetch("http://localhost:8080/api/fingerprint/scan");
    const data = await res.json();
    let timeout;
    clearTimeout(timeout)
  
    if(data.template == '' || data.template == null){
      setFPColor(colors.red)
      timeout = setTimeout(()=>{
        setFPColor(colors.black)
      }, 1000)
    }else{
      setFormData((prev)=>({
        ...prev,
        "template":data.template
      }));

      setFPColor(colors.green);

      timeout = setTimeout(()=>{
        document.getElementById('closeModal').click();

        const myModalEl = document.getElementById("fingerprintModal")

        myModalEl.addEventListener('hidden.bs.modal', ()=>{
          setFPColor(colors.black)
          setStatusMessage(status.start)
        })
      }, 1000)
    }
  }

  const signup = async(e)=>{
    e.preventDefault();

    let jsonData = {
      f_name: formData.f_name,
      l_name: formData.l_name,
      email: formData.email,
      password: formData.password,
      template: formData.template
    }

    const requestBody = {
      method: 'POST',
      body: JSON.stringify(jsonData)
    }

    const response = await fetch("http://localhost/Projects/biometric-evoting/api/user/register.php", requestBody);
    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("Hi")
  }

  const handleNext = ()=>{
    if(step === 1 && (!formData.f_name || !formData.l_name || !formData.email || !formData.password)){
      alert("please fill in all required fields")
      return;
    }

    setStep(step + 1)
  }
  const handleBack = ()=>{
    if(step > 1)
      setStep(step - 1)
  }
  
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm rounded">
            <div className="card-body">
              <h3 className="mb-4 text-center">Create Account</h3>
              <h4 className="mb-4 text-center fs-5">Step {step} of 2</h4>
              <form onSubmit={handleSubmit}>
                {
                  step === 1 && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="f_name" className='form-label'>
                          First Name
                        </label>
                        <input 
                          type="text"
                          id='f_name'
                          name='f_name'
                          className='form-control'
                          placeholder='John Doe'
                          value={formData.f_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="l_name" className='form-label'>
                          Last Name
                        </label>
                        <input 
                          type="text"
                          id='l_name'
                          name='l_name'
                          className='form-control'
                          placeholder='John Doe'
                          value={formData.l_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className='form-label'>
                          Email Address
                        </label>
                        <input 
                          type="email"
                          id='email'
                          name='email'
                          className='form-control'
                          placeholder='example@email.com'
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className='form-label'>
                          Password
                        </label>
                        <input 
                          type="password"
                          id='password'
                          name='password'
                          className='form-control'
                          placeholder='Enter your password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </>
                  )
                }
                {
                  step === 2 && (
                    <>
                      <div className='d-flex flex-column'>
                        <input
                          type="text"
                          id='template'
                          name='template'
                          value={formData.template}
                          style={{
                            display:'none'
                          }}
                          required
                        />
                        <button 
                        type='button' 
                        className='mx-auto btn btn-primary' 
                        data-bs-toggle="modal" 
                        data-bs-target='#fingerprintModal'
                      >
                        {
                          formData.template == ''? ('Scan Fingerprint'):('Scan again')
                        }
                      </button>
                      </div>
                      <Modal fpColor={fpColor} statusMessage={statusMessage} hasStarted={hasStarted} scan={scan}/>
                    </>
                  )
                }
                <div className="my-4 d-flex justify-content-between">
                  {step > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  {step < 2 && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary ms-auto"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100" 
                  onClick={signup}
                  disabled={
                    (step == maxStep && formData.template != '')?false:true
                  }
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
