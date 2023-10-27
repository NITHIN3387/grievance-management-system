import Image from "next/image";

const DocViewer = ({display, imgUrl}) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="bg-blur"
            onClick={(e) => (e.target.id == "bg-blur" ? display(false, null) : null)}
        >
            <div className="load-dialog-box bg-white rounded-lg lg:w-[70%] md:w-[80%] w-[90%] h-[80%] relative">
                <Image
                    src={imgUrl}
                    alt="doc"
                    layout="fill"
                    objectFit="contain"
                    className="p-5"
                />
            </div>
        </div>
    );
};

export default DocViewer;
