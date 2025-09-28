import { useNavigate } from "react-router-dom"
import { MdOutlineScreenRotationAlt } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
type NavButtonProps = {
    to: string;
    text : string;
    children: any;
};

function NavButton({ to, text, children }: NavButtonProps) {
    const navigator = useNavigate();
    return (
        <div className='aspect-square h-[150px] rounded-2xl border-1 cursor-pointer hover:scale-110 flex justify-center items-center'>
            <button onClick={() => navigator(to)} className = 'flex flex-col items-center cursor-pointer justify-center p-[3px]'>
                {children}
                <p>{text}</p>
            </button>
        </div>
    );
}
function Home(){
    return <div className = 'min-w-fit w-full h-full flex flex-col items-center'>
        <h1 className = 'text-3xl w-full text-center m-5'>Welcome to ADCS!</h1>
        <div className = 'w-full flex justify-around'>
            <NavButton to = "rotations" text = "Rotations">
                <MdOutlineScreenRotationAlt size = '75px'></MdOutlineScreenRotationAlt>
            </NavButton>
            <NavButton to = "algos-1" text = "Algorithms: Part One">
                <FiActivity size = '75px'></FiActivity>
            </NavButton>
        </div>
    </div>
}

export default Home