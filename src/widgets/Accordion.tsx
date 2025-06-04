import { ReactNode, useState } from 'react'
import triangle from '../assets/triangle.png'

type AccordionItemProps = {
    header: string;
    children: ReactNode;
}

export default function Accordion(): JSX.Element {

    function AccordionItem({ header, children }: AccordionItemProps): JSX.Element {
        const [isOpen, setIsOpen] = useState<boolean>(false)
        return (
            <div className="accordion__item" onClick={() => setIsOpen(!isOpen)}>
                <div className="accordion__header">
                    <h4>{header}</h4>
                    <img src={triangle} className={isOpen ? 'noopen' : 'open'} alt="Triangle icon" />
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