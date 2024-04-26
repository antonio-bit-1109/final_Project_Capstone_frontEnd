import { useSelector } from "react-redux";
import Treasure from "../assets/treasure/treasure.svg";

// eslint-disable-next-line react/prop-types
const TreasureComp = () => {
    const { showModalTreasure } = useSelector((store) => store.bonus);

    return (
        <>
            <img className={`${showModalTreasure && "shake"}`} src={Treasure} alt=" my_treasure" />
        </>
    );
};

export default TreasureComp;
