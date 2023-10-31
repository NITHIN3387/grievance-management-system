const Loader = ({display}) => {
  return (
    <div
      className={"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center z-100" + (display ? " flex" : " hidden")}
      id="bg-blur"
    >
      <div className="bg-white rounded-lg">
        
      </div>
    </div>
  );
};

export default Loader;
