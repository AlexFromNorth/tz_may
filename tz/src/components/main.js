import { useState } from 'react';
import '../App.css';
import Form from './form';


function Main() {
    const [handlerForm, setHandlerForm] = useState(false)

    return (
      <div className="App" >
        <button onClick={()=>setHandlerForm(!handlerForm)}>Form</button>
        {handlerForm && (
            <Form/>
        )}
      </div>
    );
  }
  
  export default Main;