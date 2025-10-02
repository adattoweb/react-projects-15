import github from '../assets/github.png'
import telegram from '../assets/telegram.png'

export default function Footer():JSX.Element{
    return(
        <footer className="footer">
            <div className="footer-one">
                <div className="footer-info">
                    <h4>adattoweb</h4>
                    <p>
                {'Copyright © adattoweb '+ new Date().getFullYear() + '. Всі права захищені.'}
                </p>
                </div>
            </div>
            <div className="footer-two">
                <a href="https://github.com/adattoweb" target="_blank" className="footer-two-item github">
                    <img src={github} alt="" />
                </a>
            </div>
        </footer>
    )
}