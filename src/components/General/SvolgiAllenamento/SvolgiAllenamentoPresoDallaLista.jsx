import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
// import TimerComponent from "./TimerComponent";
import SwiperCarousel from "./SwiperCarousel";
import BottoniFinePagina from "./BottoniFinePagina";
import CustomModale from "./CustomModale";
import { useEffect, useState } from "react";
import TimerComponent from "./TimerComponent";
import KcalBruciate from "./KcalBruciate";
// import { store } from "../../../redux/store/store";

const SvolgiAllenamentoPresoDallaLista = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [isCustomModalVisible, setIscoCustomModalVisible] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isCustomModalVisible) {
            setTimeout(() => {
                setIscoCustomModalVisible(false);
            }, 2000);
        }
    }, [isCustomModalVisible]);

    return (
        <div className="Bg-sfondo-dark altezza-sfondo position-relative">
            <CustomModale count={count} isCustomModalVisible={isCustomModalVisible} />
            <Container>
                <>
                    <Row>
                        <TimerComponent setCount={setCount} setIscoCustomModalVisible={setIscoCustomModalVisible} />

                        <KcalBruciate />
                        <SwiperCarousel />
                    </Row>
                </>

                <BottoniFinePagina />
            </Container>
        </div>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
