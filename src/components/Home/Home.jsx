import React, { useState } from 'react'
import InputControl from '../InputControl/InputControl';
import styles from './Home.module.css'



const Home = (props) => {
  const [anaesthesia , setAnaesthesia] = useState();
  const [values, setValues] = useState({
    name: "",
    weight:"78",
    age: "",
    drug: "",
    cons:"",
  });
  var [amm ,setAmm]= useState();

  const calCulate1=()=>{
    
    const up = values.weight*parseInt(values.drug);
    const down = 10*values.cons;
    setAmm(up/down);
    }

    const calCulate2=()=>{
    
      const up = values.weight*parseFloat(values.drug);
     const res = up.toFixed(2);
      setAmm(res);
      console.log(res);
      }
    

  return (<>

  <div className={styles.bak}>
  <div className={styles.container}>
    <div className={styles.innerBox}>
      <h1 className={styles.heading}>Anaesthesia ammount calculator</h1>

      <InputControl
        label="Name of patient"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
         
        placeholder="name of patient"
      />
      <InputControl
        label="Weight of patient"

        placeholder="78 kg"
        disabled
      />
      
       
      <InputControl
        label="Age of patient"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, age: event.target.value }))
        }
        placeholder="enter age "
       
      />
      <label className={styles.lb}>Type of Anesthesia </label>
  <select  value ={anaesthesia} className={styles.llb}  onChange={e=>setAnaesthesia(e.target.value)}
  >
     <option value="Position">Select drug type</option>
    <option value="Local">Local</option>
    <option value="General">General</option>
  </select>

  {anaesthesia === 'Local' ? (<><label className={styles.lb}>Drug Type </label>
  <select className={styles.llb}  onChange={(event) =>
          setValues((prev) => ({ ...prev, drug: event.target.value }))
        }>
     <option value="Position">Select drug type</option>
    <option value="7mg">Lidocaine    (max dose : 7mg/kg)</option>
    <option value="2mg">Bupivacaine (max dose : 2mg/kg) </option>
    <option value="4mg">Mepivacaine  (max dose : 6.6mg/kg)</option>
    <option value="7mg">Prilocaine   (max dose : 8mg/kg)</option>
    <option value="4mg">Ropivacaine  (max dose : 4mg/kg)</option>


  </select>
       <InputControl
        label="Concentration of dose "
        onChange={(event) =>
          setValues((prev) => ({ ...prev, cons: event.target.value }))
        }
       
        placeholder="enter percentage [0.5 % - 4 %]"
      /></>) : <><><label className={styles.lb}>Drug Type </label>
      <select className={styles.llb} onChange={(event) =>
          setValues((prev) => ({ ...prev, drug: event.target.value }))
        } >
         <option value="Position">Select drug type</option>
        <option value="0.2mg">Midazolam    (max dose : 0.2mg/kg)</option>
        <option value="2.5mg">Propofol (max dose : 2.5mg/kg) </option>
        <option value="0.4mg">Etomidate  (max dose : 0.4mg/kg)</option>
        <option value="0.35mg">Remazolamc  (max dose : 0.35mg/kg)</option>
    
      </select>
          </></>}

      <div className={styles.footer}>
        <b className={styles.error}></b>
        {anaesthesia === 'Local' ? (<>
          <button  onClick={calCulate1}> 
          Calculate
        </button>
        </>) : <>
        <button  onClick={calCulate2}> 
          Calculate
        </button>
        </>}
       
        <div className={styles.sidecon}>
          <div className={styles.lb1}>
          Name of patient :  {values.name} <br /><br />
      Age :{values.age} <br /><br />
      Anesthesia Type : {anaesthesia} <br /><br />
      Anesthesia ammount calculate  :{amm}ml 

          </div>
    
  </div>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}

export default Home