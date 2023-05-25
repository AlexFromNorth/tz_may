import { useState } from 'react';
import '../App.css';

function Form() {
    const [handlerForm, setHandlerForm] = useState(true)

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [messageDirty, setMessageDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [nameError, setNameError] = useState('Name cannot be empty')
    const [messageError, setMessageError] = useState('Message cannot be empty')
    const [phoneError, setPhoneError] = useState('Phone cannot be empty')



    const onSubmit = data => {
        setHandlerForm(false)
		data.preventDefault();

        let text = JSON.stringify([
            {'Name': [data.target[0].value]},
            {'Message': [data.target[1].value]},
            {'Phone': [data.target[2].value]},
        ]);

        function downloadAsFile(data) {
          let a = document.createElement("a");
          let file = new Blob([data], {type: 'application/json'});
          a.href = URL.createObjectURL(file);
          a.download = "anyName.json";
          a.click();
        }

        downloadAsFile(text);
        alert('Sent successfully')
	}

    const nameHandler = (e) => {
        setName(e.target.value)
        const re = /[^a-z,а-я,A-Z,А-Я, ,0-9]/g;
        if(re.test(String(e.target.value))){
            setNameError('Incorrect name, do not use special characters and a space')
        }
        else{
            setNameError('')
        }
        if(!e.target.value || e.target.value === ''){
            setNameError('Name cannot be empty')
        }
    }

    const messageHandler = (e) => {
        setMessage(e.target.value)
        const re = /[^a-z,а-я,A-Z,А-Я, ,0-9]/i;
        if(re.test(String(e.target.value))){
            setMessageError('Incorrect message, do not use special characters and a space')
        }
        else{
            setMessageError('')
        }
        if(!e.target.value || e.target.value === ''){
            setMessageError('Name cannot be empty')
        }
    }

    const phoneHandler = (e) => {
        const re = /[^\d]/g;
        let phoneNumber = e.target.value.replace(re, '');
        const phoneNumberLength = phoneNumber.length
        if(phoneNumberLength>0 && phoneNumberLength<2){
            setPhone(`+${phoneNumber.slice(0,1)}`)
        }
        else if(phoneNumberLength>1 && phoneNumberLength<5){
            setPhone(`+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1)})`)
        }
        else if(phoneNumberLength>4 && phoneNumberLength<9){
            setPhone(`+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4)}`)
        }
        else if(phoneNumberLength>8 && phoneNumberLength<11){
            setPhone(`+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4,8)}-${phoneNumber.slice(8)} `)
        }
        else if(phoneNumberLength>10){
            setPhone(`+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4,8)}-${phoneNumber.slice(8,10)}-${phoneNumber.slice(10)}`)
        }

        if(!e.target.value || e.target.value == ''){
            setPhoneError('Phone cannot be empty')
        }
        if(e.target.value.length>0){
            setPhoneError('')
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name){
            case 'name':
                setNameDirty(true)
                break
            case 'message':
                setMessageDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
        }
    }



    if(handlerForm===true){
        return (
            <div className="wrapper" >
              <form onSubmit={onSubmit}>
                  {(nameDirty && nameError) && <div style={{color:'red'}}>{nameError}</div>}
                  <input onChange={e=>nameHandler(e)} value={name} onBlur={e=>blurHandler(e)} name='name' type="text" placeholder='Enter your name...'/>
                  {(messageDirty && messageError) && <div style={{color:'red'}}>{messageError}</div>}
                  <textarea onChange={e=>messageHandler(e)}  value={message} onBlur={e=>blurHandler(e)} name='message' type="text" placeholder='Enter your message...'/> 
                  {(phoneDirty && phoneError) && <div style={{color:'red'}}>{phoneError}</div>}
                  <input onChange={e=>phoneHandler(e)}  value={phone} onBlur={e=>blurHandler(e)} name='phone' type="text" placeholder='+X (XXX) XXX-XX-XX'/>
      
                  <button  type='submit'>Send</button>
              </form>
            </div>
          );
    }
  }
  
  export default Form;