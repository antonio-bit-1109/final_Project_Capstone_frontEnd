import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { PostAllenamentoConcluso } from "../../../redux/actions/fetchAllenamento";
// import { useNavigate } from "react-router-dom";
// import { setAllenamentoSceltogiaCreato } from "../../../redux/reducers/allenamentiReducer";
// Import Swiper React components
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow, EffectFade } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
// import { toast } from "react-toastify";
// import { useEffect, useState, useRef } from "react";
import TimerComponent from "./TimerComponent";
import SwiperCarousel from "./SwiperCarousel";
import BottoniFinePagina from "./BottoniFinePagina";

const SvolgiAllenamentoPresoDallaLista = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);
    console.log(AllenamentoSceltogiaCreato);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            <Container>
                {AllenamentoSceltogiaCreato && (
                    <>
                        <Row>
                            <TimerComponent AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato} />
                            <SwiperCarousel AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato} />
                        </Row>
                    </>
                )}

                <BottoniFinePagina AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato} />
            </Container>
        </div>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
