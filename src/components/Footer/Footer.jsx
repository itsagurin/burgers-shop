import './Footer.scss'
import VK from "../../assets/footer/vk.svg"
import Telegram from "../../assets/footer/telegram.svg"
import logo from "../../assets/footer/footer_logo.svg"
import phone from "../../assets/footer/phone.svg"

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer_top">
                    <div className="footer_logo">
                        <a href="#"><img src={logo} alt="logo"/></a>
                    </div>
                    <div className="footer_info">
                        <div className="footer_info-phone">
                            <p>Номер для заказа</p>
                            <a href="tel:+79308333811"><img src={phone} alt="Телефон"/>+7(930)833-38-11</a>
                        </div>
                        <div className="footer_info-social">
                            <p>Мы в соцсетях</p>
                            <div>
                                <a href="#">
                                    <img src={VK} alt="VK"/>
                                </a>
                                <a href="#">
                                    <img src={Telegram} alt="Telegram"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom">
                    <p>© YouMeal, 2022</p>
                    <p>Design: Anastasia Ilina</p>
                </div>
            </div>
        </footer>
    )
}