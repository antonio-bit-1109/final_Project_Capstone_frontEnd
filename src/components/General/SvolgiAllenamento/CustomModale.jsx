/* eslint-disable react/prop-types */
const CustomModale = ({ isCustomModalVisible, count }) => {
    return (
        <div
            className={`${
                isCustomModalVisible ? "d-flex customProp" : "d-none"
            } profondita altezza-sfondo justify-content-center align-items-center position-absolute top-0 end-0 start-0 w-100`}
        >
            <h2 className={`text-warning fw-bold display-1 ${isCustomModalVisible ? "customModalAnimation" : ""}`}>
                {count % 2 === 0 ? "Stop!" : "Via!"}
            </h2>
        </div>
    );
};

export default CustomModale;
