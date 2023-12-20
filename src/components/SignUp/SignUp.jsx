import {useState} from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from '../InputControl/InputControl';
import { auth } from "../../firebase";

const SignUp = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    batchid: "",
    position:"",
    pass: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmission=()=>{
    if( !values.name || !values.email || !values.batchid || !values.position || !values.pass){
      setErrorMsg("Please fill all the fields ");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
      setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
      navigate("/");

    }).catch((err) =>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    })

  }
  return (<>
  <div className={styles.bak}>
    <div className={styles.container}>
    <div className={styles.innerBox}>
      <h1 className={styles.heading}>SignUp</h1>

      <InputControl
        label="Name"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
        placeholder="Enter your name"
      />
      <InputControl
        label="Email"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="Enter email address"
      />
      <InputControl
        label="Batch Number"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, batchid: event.target.value }))
        }
        placeholder="Enter your batch id"
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
        placeholder="Enter your password"
      />


      <div className={styles.footer}>
        <b className={styles.error}>{errorMsg}</b>
        <button  onClick={handleSubmission}  disabled={submitButtonDisabled} >  
          SignUp
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}

export default SignUp