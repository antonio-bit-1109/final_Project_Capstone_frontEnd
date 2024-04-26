import Treasure from "../assets/treasure/treasure.svg";

// eslint-disable-next-line react/prop-types
const TreasureComp = ({ showCustomModalTreasure }) => {
    return (
        <>
            <img className={`${showCustomModalTreasure && "shake"}`} src={Treasure} alt=" my_treasure" />
        </>
    );
};

export default TreasureComp;
