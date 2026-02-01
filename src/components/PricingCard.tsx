import React from 'react';
import styles from './PricingCard.module.css';
import Link from 'next/link';

interface PricingCardProps {
    title: string;
    subtitle: string;
    price: string;
    priceUnit?: string;
    features: string[];
    buttonText: string;
    link: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    subtitle,
    price,
    priceUnit,
    features,
    buttonText,
    link
}) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            className={styles.card}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.card__border} />
            <div className={styles.card_title__container}>
                <span className={styles.card_title}>{title}</span>
                <p className={styles.card_paragraph}>{subtitle}</p>
            </div>

            <div className={styles.price_container}>
                <span className={styles.price}>{price}</span>
                {priceUnit && <span className={styles.price_unit}>{priceUnit}</span>}
            </div>

            <div className={styles.line} />

            <ul className={styles.card__list}>
                {features.map((feature, index) => (
                    <li key={index} className={styles.card__list_item}>
                        <div className={styles.check}>
                            <svg className={styles.check_svg} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className={styles.list_text}>{feature}</span>
                    </li>
                ))}
            </ul>

            <Link href={link} className='w-full mt-auto'>
                <button className={styles.button}>{buttonText}</button>
            </Link>
        </div>
    );
};

export default PricingCard;
