import InfoDropdown from "../components/InfoDropdown"
import { InlineMath, BlockMath } from 'react-katex';
import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";

function AlgorithmsThree(){
    return <div className = 'w-full h-full flex flex-col items-center gap-[5px]'>
        <h1 className = 'text-3xl w-full text-center m-5'>Algorithms: Part 3</h1>
        <InfoDropdown outerString="Bayesian Statistics">
            <div className = 'flex flex-col justify-items items-center'>

            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>

            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Extended Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>

            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Multiplicative Extended Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>

            </div>
        </InfoDropdown>
        <InfoDropdown outerString="Unscented Kalman Filters">
            <div className = 'flex flex-col justify-items items-center'>

            </div>
        </InfoDropdown>

    </div>
}
export default AlgorithmsThree