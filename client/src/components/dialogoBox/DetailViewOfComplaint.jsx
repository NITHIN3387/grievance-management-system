
const DetailViewOfCompliant = ({display, details}) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="bg-blur"
            onClick={(e) => (e.target.id == "bg-blur" ? display(false, null) : null)}
        >
            <div className="grid load-dialog-box bg-white rounded-lg lg:w-[70%] md:w-[80%] w-[90%] h-[80%] xl:p-10 lg:p-8 md:p-6 p-5">
                <div className="overflow-y-scroll rounded-md">
                    <div className="grid gap-2 mb-10">
                        <div className="text-[1.2em] font-bold">Address:</div>
                        <div>{details.location}</div>
                    </div>
                    <div className="grid gap-2 mb-10">
                        <div className="text-[1.2em] font-bold">Description:</div>
                        <div>{details.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailViewOfCompliant;
