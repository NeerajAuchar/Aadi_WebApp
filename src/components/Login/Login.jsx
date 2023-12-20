import {useState} from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from '../InputControl/InputControl';
import { auth } from "../../firebase";




const Login = () => {



  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    position:"",
    pass: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmission=()=>{
    if( !values.email || !values.position || !values.pass){
      setErrorMsg("Please fill all the fields ");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
      setSubmitButtonDisabled(false);
      navigate("/");

    }).catch((err) =>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    })

  }
  return (
   
    <div className={styles.bak}> 
        <div className={styles.container}>
    <div className={styles.innerBox}>
      <h1 className={styles.heading}>Login</h1>

      <InputControl
        label="Email"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="Enter email address"
      />
       <label className={styles.lb}>Select your position </label>
  <select className={styles.llb} id="Name" onChange={(event)=>{
     setValues((prev) => ({ ...prev, position: event.target.value }))
  }}>
     <option value="Position">Select your position</option>
    <option value="Admin">Admin</option>
    <option value="Doctor">Doctor </option>
    <option value="Nurse">Nurse</option>
  </select>
      <InputControl
        label="Password"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        }
        placeholder="Enter Password"
      />

      <div className={styles.footer}>
        <b className={styles.error}>{errorMsg}</b>
        <button disabled={submitButtonDisabled} onClick={handleSubmission}> 
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login