import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
type DropdownProps = {
    outerString: string;
    children: any;
};
function InfoDropdown({outerString, children} : DropdownProps){
    const [opened, setOpened] = useState(false)
    return <div className = 'overflow-x-scroll h-fit p-[5px] pt-[10px] w-8/10 gap-[5px] flex flex-col justify-center items-center border-2 rounded-2xl'>
        <h2 className = 'w-full h-fit text-center text-2xl select-none'>{outerString}</h2>
        {opened ? 
            <div className = 'w-9/10 flex items-center'>
                {children}
            </div>
            : null}
        <button onClick = {() => {setOpened(!opened)}} className = 'h-fit w-full flex items-center justify-center cursor-pointer'>
            {opened ? 
                <IoIosArrowUp className = 'h-[15px] hover:h-[18px]'/>:
                <IoIosArrowDown className = 'h-[15px] hover:h-[18px]'/>
            }
        </button>
    </div>
}
export default InfoDropdown