import { useNavigate } from "react-router-dom";
import { useForm } from "@formspree/react";
function Help(){
    const navigator = useNavigate();
    const help_url = import.meta.env.VITE_URL
    const [state, handleSubmit] = useForm(help_url);
    if(state.succeeded){
        navigator("home")
    }
    
    return <div className = 'min-w-fit w-full h-full flex flex-col items-center justify-around'>
        <h1 className = 'text-3xl w-full text-center m-5'>Contact me!</h1>
        <form onSubmit = {handleSubmit} className = 'w-9/10 flex flex-col gap-[20px]'>
            <div className = 'w-full flex'>
                <p className = 'p-[3px] pr-[25px]'>Name: </p>
                <input type="text" name="name" className = 'min-w-[200px] w-3/10 border-2 rounded-2xl p-[5px]'></input>
            </div>
            <div className = 'w-full flex'>
                <p className = 'p-[3px] pr-[5px]'>Contact Info: </p>
                <input type="text" name="contact" className = 'min-w-[200px] w-3/10 border-2 rounded-2xl p-[5px]'></input>
            </div>
            <div className = 'w-full flex'>
                <p className = 'p-[5px]'>Question: </p>
                <textarea  name="message" className = 'min-w-[200px] min-h-[300px] w-full border-2 rounded-2xl align-text-top p-[5px]'></textarea>
            </div>
            
            <div className = 'flex w-full justify-center items-center'>
                <button type='submit' disabled={state.submitting} className = {` min-w-[50px] w-[1/10] border-2 rounded-2xl cursor-pointer`}>{state.submitting ?'...' : 'Send'}</button>
            </div>
        </form>
    </div>
}
export default Help