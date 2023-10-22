import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100s ">
      <ThreeCircles
        height="100"
        width="100"
        color="#0D6EFD"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loading;
