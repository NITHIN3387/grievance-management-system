import Image from "next/image";
const totalProblemsCount = 10;
const poorProblemsCount = 3;
const pendingProblemsCount = 4;
const onProcessProblemsCount = 2;
const successProblemsCount = 1;
<>
        {/* <----------------   desktop view    -------------------->  */}
        <div className='hidden md:flex justify-between pe-4 h-[5rem] items-center bg-blue-950'>
            {/* Image of the user */}
            <Image
            src={userProfile}
            alt={'no profile'}
            width={30}
            className='invert'
            />
            

            {/* all the status   */}
            <div className='flex xl:gap-[2rem] lg:gap-[1.75rem] gap-[1rem] items-center'>
                {/* total problem solved */}
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-black cursor-pointer' onClick={() => display(true)}>Total Problems Submitted: {totalProblemsCount}</span>
                {/* Raise your complaint  */}
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-black cursor-pointer' onClick={() => display(true)}>Poor Problems: {poorProblemsCount}</span>
                {/* problems  */}
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-black'>Pending Problems: {pendingProblemsCount}</span>
                {/* solved problems  */}
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-black'>Problems on Process: {onProcessProblemsCount}</span>
                <span className='xl:text-[1.25em] lg:text-[1.15rem] md:text-[1.05rem] text-black'>Successful Resolutions: {successProblemsCount}</span>


               
            </div>
        </div>

        {/* <--------------------- mobile view ---------------------> */}
        <div className='md:hidden flex justify-between pe-6 h-[5rem] items-center bg-blue-950'>
            {/* logo of the website  */}
            <Link href={'/'}>
                <Logo />
            </Link>

            <div className='flex gap-[2rem]'>
                {/* navbar toggle button  */}
                <span onClick={handleNavabrDisplay}>
                    <Image 
                        src={Navigation}
                        alt={'navigation'}
                        width={35}
                        className='invert'
                    />
                </span>

                {/* bg blur effect  */}
                <div className='fixed hidden justify-end inset-0 bg-black bg-opacity-25 backdrop-blur-sm' id='mbl-nav' ref={mobileNavabr} onClick={(e) => e.target.id == "mbl-nav" ? handleNavabrDisplay() : null}>
                    {/* navbar  */}
                    <div className='navbar-toggle-animation grid grid-rows-[4rem_1fr_3rem] w-[80%] bg-blue-950 p-5'>
                        <div className='flex justify-between items-center mb-5'>
                            {/* heading */}
                            <span className='text-white text-[1.75em]'>Menu</span>
                            <span className='text-white text-[1.75em]' onClick={handleNavabrDisplay}>
                                <Image 
                                    src={Cancel}
                                    alt='Cancel'
                                    width={25}
                                    className='invert'
                                />
                            </span>
                        </div>
                        {/* navigation links  */}
                        <div className='flex flex-col'>
                            {/* dashboard  */}
                            <div className='flex gap-5 py-5 text-white bg-black bg-opacity-25 border-s-[5px] ps-[20px]'>
                                <Image 
                                    src={Dashboard}
                                    alt='dashboard'
                                    width={25}
                                    className='invert'
                                />
                                <span>Dashboard</span>
                            </div>
                            {/* raise your problem  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]' onClick={() => {display(true); handleNavabrDisplay()}}>
                                <Image 
                                    src={AddComplaint}
                                    alt='AddComplaint'
                                    width={25}
                                    className='invert'
                                />
                                <span>Raise the problem</span>
                            </div>
                            {/* problems  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]'>
                                <Image 
                                    src={Complaints}
                                    alt='Complaints'
                                    width={25}
                                    className='invert'
                                />
                                <span>Problems</span>
                            </div>
                            {/* solved problems  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]'>
                                <Image 
                                    src={Solved}
                                    alt='Solved'
                                    width={25}
                                    className='invert'
                                    onClick={() => display(true)}
                                />
                                <span>Solved problems</span>
                            </div>
                            {/* profile  */}
                            <div className='flex gap-5 py-5 text-white ps-[20px]'>
                                <Image 
                                    src={Profile}
                                    alt='Profile'
                                    width={25}
                                    className='invert'
                                />
                                <span>Profile</span>
                            </div>
                        </div>
                        {/* logout button */}
                        <div className='flex gap-5 border-t-2 border-white items-end' onClick={handleLogout}>
                            <Image 
                                src={Logout}
                                alt='Logout'
                                width={35}
                                className='invert'
                            />
                            <span className='text-[1.25em] text-white'>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>