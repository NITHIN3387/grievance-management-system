'use client'

import { useRef, useState } from "react"
import Image from "next/image"

import DetailViewOfCompliant from "./dialogoBox/DetailViewOfComplaint"
import DocViewer from "./dialogoBox/DocViewer"

import Date from "@assets/images/date.png"
import Poor from "@assets/images/poor.png"
import Pending from "@assets/images/pending.png"
import OnProgress from "@assets/images/on-progress-yellow.png"
import Solved from "@assets/images/solved.png"

const UserProblemCard = ({data, action}) => {
    const [detail, setDetail] = useState('')

    const displayViewDoc = useRef() 
    const detailedViewRef = useRef()     //DOM refference to the Detailed view of complaint component
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
    const viewDoc = (display) => {
        if (display) {
            viewDocRef.current.classList.add('flex')
            viewDocRef.current.classList.remove('hidden')
        } else {
            viewDocRef.current.classList.add('hidden')
            viewDocRef.current.classList.remove('flex')
        }
    }

    //function to handle the display of detailed view of complaint dialog box
    const detailedView = (display, data) => {
        if (display) {
            setDetail(data)
            detailedViewRef.current.classList.add('flex')
            detailedViewRef.current.classList.remove('hidden')
        } else {
            detailedViewRef.current.classList.add('hidden')
            detailedViewRef.current.classList.remove('flex')
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
                {/* description  */}
                <div className="description-cutoff sm:text-[1em] text-[0.9em] sm:h-[4.9rem] h-[4rem] overflow-hidden" onClick={() => detailedView(true, data)}>
                    {data.description}
                </div>
                {/* date for desktop view */}
                <div className="sm:flex hidden items-center gap-3">
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
            </div>

            {/* date for mobile view */}
            <div className="sm:hidden flex"></div>
            <div className="sm:hidden flex text-[0.75em] text-slate-700 items-center">
                {data.date.split("-").reverse().join("-")}
            </div>

            <div className="flex justify-center items-center font-bold">
                {
                    action.status == "poor" ?
                    <>
                        <Image 
                            src={Poor}
                            alt="Poor"
                            width={16}
                            height={16}
                            className="sm:inline hidden me-3"
                        />
                        <span className="text-red-500">Poor</span>
                    </>:
                    action.status == "pending" ?
                    <>
                        <Image 
                            src={Pending}
                            alt="Pending"
                            width={16}
                            height={16}
                            className="sm:inline hidden me-3"
                        />
                        <span className="text-slate-500">Pending</span>
                    </>:
                    action.status == "on progress" ?
                    <>
                        <Image 
                            src={OnProgress}
                            alt="OnProgress"
                            width={16}
                            height={16}
                            className="sm:inline hidden me-3"
                        />
                        <span className="text-yellow-500">Progress</span>
                    </>:
                    <>
                        <Image 
                            src={Solved}
                            alt="Solved"
                            width={16}
                            height={16}
                            className="sm:inline hidden me-3"
                        />
                        <span className="text-green-500">Solved</span>
                    </>

                }
            </div>

            {/* status of the complaint  */}
            <div className="grid items-center lg:w-[50%] sm:w-[80%]">
                {
                    action.status == "poor" ?
                    <div className="grid grid-cols-[5px_1fr_5px_1fr_5px_1fr_5px] items-center">
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full translate-x-0 bg-red-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                    </div>:
                    action.status == "pending" ?
                    <div className="grid grid-cols-[5px_1fr_5px_1fr_5px_1fr_5px] items-center">
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full translate-x-0 bg-slate-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-slate-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-slate-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                    </div>:
                    action.status == "on progress" ?
                    <div className="grid grid-cols-[5px_1fr_5px_1fr_5px_1fr_5px] items-center">
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full translate-x-0 bg-yellow-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-yellow-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-yellow-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-yellow-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-yellow-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-blue-800"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-blue-800"></div>
                    </div>:
                    <div className="grid grid-cols-[5px_1fr_5px_1fr_5px_1fr_5px] items-center">
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full translate-x-0 bg-green-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-green-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-green-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-green-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-green-500"></div>
                        <div className="sm:h-[0.5rem] h-[0.25rem] bg-green-500"></div>
                        <div className="sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] rounded-full sm:translate-x-[-0.75rem] translate-x-[-0.5rem] bg-green-500"></div>
                    </div>
                }
            </div>

            {/* display the description and img's updated by the department  */}
            {
                action.image.length ?
                (
                    <div className="relative grid place-items-center sm:h-[7rem] h-[4rem] border-dashed border-slate-500 border-2" onClick={() => viewDoc(true)}>
                        <Image
                            src={action.image}
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
                ) : <div></div>
            }

            {
                action.description.length ?
                (
                    <div className="description-cutoff sm:text-[1em] text-[0.9em] sm:h-max-[4.9rem] h-max-[4rem] overflow-hidden" onClick={() => detailedView(true, action)}>
                        {action.description}
                    </div>
                ) : <div></div>
            }

            {
                !action.description.length && !action.image.length?
                (
                    <>
                        <div></div>
                        <div className="font-bold text-center">No updates from the department to show</div>
                    </>
                ) : null
            }

            {/* DocViewer dialog box  */}
            <div className="hidden fixed" ref={viewDocRef}>
                <DocViewer display={viewDoc} imgUrl={data.imageUrl}/>
            </div>

            {/* detailed view of complaint box  */}
            <div className="hidden fixed" ref={detailedViewRef}>
                <DetailViewOfCompliant display={detailedView} details={detail}/>
            </div>
        </div>
    )
}

export default UserProblemCard