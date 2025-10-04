import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Help(){
    const navigator = useNavigate();
    const help_url = import.meta.env.VITE_URL
    const formData = new FormData()
    const [name, setName] = useState('')
    
    const [contact, setContact] = useState('')
    const [message, setMessage] = useState('')
    const submit = () => {
        formData.append('name', name)
        formData.append('contact', contact)
        formData.append('question', message)
        fetch(help_url, {
            method: 'POST',
            body: formData
        })
    }
    
    return <div className = 'min-w-fit w-full h-full flex flex-col items-center justify-around'>
        <h1 className = 'text-3xl w-full text-center m-5'>Contact me!</h1>
        <form action={help_url} method="POST" className = 'w-9/10 flex flex-col gap-[20px]'>
            <div className = 'w-full flex'>
                <p className = 'p-[3px] pr-[25px]'>Name: </p>
                <input onChange = {(event) => setName(event.target.value)} type="text" name="name" className = 'min-w-[200px] w-3/10 border-2 rounded-2xl p-[5px]'></input>
            </div>
            <div className = 'w-full flex'>
                <p className = 'p-[3px] pr-[5px]'>Contact Info: </p>
                <input onChange = {(event) => setContact(event.target.value)} type="text" name="contact" className = 'min-w-[200px] w-3/10 border-2 rounded-2xl p-[5px]'></input>
            </div>
            <div className = 'w-full flex'>
                <p className = 'p-[5px]'>Question: </p>
                <textarea onChange = {(event) => setMessage(event.target.value)} name="message" className = 'min-w-[200px] min-h-[300px] w-full border-2 rounded-2xl align-text-top p-[5px]'></textarea>
            </div>
            
            <div className = 'flex w-full justify-center items-center'>
                <button type='submit' onSubmit = {() => {
                    submit()
                    navigator("home")
                    }} className = 'min-w-[50px] w-[1/10] border-2 rounded-2xl cursor-pointer'>Send</button>
            </div>
        </form>
    </div>
}
export default Help