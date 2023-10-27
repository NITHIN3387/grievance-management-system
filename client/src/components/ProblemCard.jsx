import { useRef } from "react";
import Image from "next/image";

import Location from "@assets/images/location.png"
import Date from "@assets/images/date.png"
import Pending from "@assets/images/pending.png"
import Onprogress from "@assets/images/on-progress-yellow.png"
import ActionDialogBox from "./dialogoBox/ActionDialogBox";
import DocViewer from "./dialogoBox/DocViewer";

const ProblemCard = ({data, action}) => {
    const location = data.location.split(',')

    const displayViewDoc = useRef() 
    const actionBoxRef = useRef()     //DOM refference to the action box component
    const viewDocRef = useRef()     //DOM refference to the DocViewer component

    //function to handle the display of doc viewer dialogbox
    const handleDisplayViewDoc = (display) => {
        if (display){
            displayViewDoc.current.classList.add('flex')
            displayViewDoc.current.classList.remove('sm:hidden')
        } else {
            displayViewDoc.current.classList.add('sm:hidden')
            displayViewDoc.current.classList.remove('flex')
        }
    }

    //function to handle the display of DocViewer dialog box
    const viewActionBox = (display) => {
        if (display) {
            actionBoxRef.current.classList.add('flex')
            actionBoxRef.current.classList.remove('hidden')
        } else {
            actionBoxRef.current.classList.add('hidden')
            actionBoxRef.current.classList.remove('flex')
        }
    }

    //function to handle the display of DocViewer dialog box
    const viewDoc = (display) => {
        if (display) {
            viewDocRef.current.classList.add('flex')
            viewDocRef.current.classList.remove('hidden')
        } else {
            viewDocRef.current.classList.add('hidden')
            viewDocRef.current.classList.remove('flex')
        }
    }

    return (
        <div className="grid xl:grid-cols-[1fr_9fr] lg:grid-cols-[1fr_7fr] md:grid-cols-[1fr_4fr] grid-cols-[1fr_4fr] sm:gap-5 gap-2 sm:p-5 p-3 border-y odd:bg-slate-200">
            {/* document */}
            <div className="relative grid place-items-center sm:h-[7rem] h-[4rem] border-dashed border-slate-500 border-2" onClick={() => viewDoc(true)}>
                <Image
                    src={data.imageUrl}
                    alt="document"
                    layout="fill"
                    objectFit='contain'
                    onMouseOver={() => handleDisplayViewDoc(true)}
                    onMouseOut={() => handleDisplayViewDoc(false)}
                    className="sm:inline hidden"
                    priority
                />
                <div
                    className="absolute bg-black bg-opacity-50 h-[100%] w-[100%] sm:hidden flex justify-center items-center text-center text-white transition-all duration-100"
                    ref={displayViewDoc}
                >
                    View Doc
                </div>
            </div>
            {/* details  */}
            <div className="flex flex-col justify-between">
                {/* discriptio and status  */}
                <div className="flex justify-between gap-3">
                    {/* description  */}
                    <div className="sm:text-[1em] text-[0.9em]">{data.description}</div>
                    {/* status  */}
                    <div>{
                        action.status == "pending" ?
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={Pending}
                                alt="pending"
                                width={17}
                                height={17}
                            />
                            <div className="sm:inline hidden text-slate-500 font-semibold">Pending</div>
                        </div> :
                        <div className="flex gap-2 items-center">
                        <Image 
                            src={Onprogress}
                            alt="Onprogress"
                            width={17}
                            height={17}
                        />
                        <div className="text-yellow-400 font-semibold sm:inline hidden">On Progress</div>
                    </div>
                    }</div>
                </div>
                {/* date and location for desktop view */}
                <div className="sm:flex hidden justify-between  items-center">
                    <div className="flex gap-5">
                        {/* date */}
                        <div className="flex gap-3  items-center">
                            <div>
                                <Image 
                                    src={Date}
                                    alt="Date"
                                    width={16}
                                    height={16}
                                    className="sm:inline hidden"
                                />
                            </div>
                            <div className="text-[0.85em] text-slate-700">
                                {data.date.split("-").reverse().join("-")}
                            </div>
                        </div>
                        {/* location  */}
                        <div className="flex gap-2  items-center">
                            <div>
                                <Image 
                                    src={Location}
                                    alt="location"
                                    width={12}
                                    height={12}
                                />
                            </div>
                            <div className="text-[0.9em] text-slate-700">
                                {location[location.indexOf(' Karnataka') - 1]}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="bg-blue-900 text-white py-1 px-2 rounded-md cursor-pointer" onClick={() => {viewActionBox(true)}}>
                            Update Status
                        </div>
                    </div>
                </div>
            </div>

            {/* date and location for mobile view */}
            <div className="sm:hidden py-[3px] bg-blue-900 text-white text-center rounded-md text-[0.8em]" onClick={() => {viewActionBox(true)}}>
                Action
            </div>
            <div className="sm:hidden flex justify-between">
                {/* location  */}
                <div className="flex gap-2  items-center">
                    <div>
                        <Image 
                            src={Location}
                            alt="location"
                            width={12}
                            height={12}
                        />
                    </div>
                    <div className="text-[0.8em] text-slate-700">{location[location.indexOf(' Karnataka') - 1]}</div>
                </div>
                {/* date */}
                <div className="text-[0.75em] text-slate-700 flex items-center">
                    {data.date.split("-").reverse().join("-")}
                </div>            
            </div>

            {/* DocViewer dialog box  */}
            <div className="hidden z-10 fixed" ref={viewDocRef}>
                <DocViewer display={viewDoc} imgUrl={data.imageUrl}/>
            </div>

            {/* action dialog box  */}
            <div className=" z-10 fixed" ref={actionBoxRef}>
                <ActionDialogBox display={viewActionBox} action={action}/>
            </div>
        </div>
    )
};

export default ProblemCard;
