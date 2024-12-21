import {useState} from 'react'

import triangle from './assets/triangle.png'

export default function Accordion (){
    const AccordionItem = (props) =>{
        const [isOpen, setIsOpen] = useState(false)
        const {header, children} = props
        return (
            <div className="accordion__item" onClick={() => setIsOpen(!isOpen)}>
                <div className="accordion__header">
                    <h4>{header}</h4>
                    <img src={triangle} className={isOpen ? 'noopen' : 'open'} alt="" />
                </div>
                {isOpen && 
                <div className={isOpen ? 'accordion__text animation' : 'accordion__text'}>
                    <p>{children}</p>
                </div>
                }
            </div>
        )
    }
    return (
        <div className="accordion__parent block">
            <AccordionItem header='Як відкрити цей блок'>Натисніть на цей блок!</AccordionItem>
            <AccordionItem header='Як відкрити цей блок'>Натисніть на цей блок!</AccordionItem>
            <AccordionItem header='Як відкрити цей блок'>Натисніть на цей блок!</AccordionItem>
            <AccordionItem header='Як відкрити цей блок'>Натисніть на цей блок!</AccordionItem>
            <AccordionItem header='Як відкрити цей блок'>Натисніть на цей блок!</AccordionItem>
        </div>
    )
}