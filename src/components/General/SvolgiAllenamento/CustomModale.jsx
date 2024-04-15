/* eslint-disable react/prop-types */
const CustomModale = ({ isCustomModalVisible }) => {
    return (
        <div
            className={`${
                isCustomModalVisible ? "d-flex customProp" : "d-none"
            } min-vh-100  justify-content-center align-items-center position-absolute top-0 end-0 start-0 w-100`}
        >
            <h2 className=" text-warning fw-bold display-1">Iniziamo!</h2>
        </div>
    );
};

export default CustomModale;
