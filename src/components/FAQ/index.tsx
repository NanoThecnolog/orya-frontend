// components/Faq.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export type FaqCategory = {
    category: string;
    items: {
        question: string;
        answer: string;
    }[];
};

type Props = {
    data: FaqCategory[];
};

export default function Faq({ data }: Props) {
    const [open, setOpen] = useState<string | null>(null);
    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    const toggle = (key: string) => {
        setOpen(prev => (prev === key ? null : key));
    };

    useEffect(() => {
        Object.keys(refs.current).forEach(key => {
            const el = refs.current[key]
            if (!el) return
            if (open === key) {
                const fullHeight = el.scrollHeight
                el.style.maxHeight = fullHeight + 'px'
            } else el.style.maxHeight = '0px'
        })
    }, [open])

    return (
        <div className={styles.faqContainer}>
            {data.map(cat => (
                <div key={cat.category} className={styles.category}>
                    <h2 className={styles.categoryTitle}>{cat.category}</h2>

                    {cat.items.map(item => {
                        const key = `${cat.category}-${item.question}`;

                        return (
                            <div key={key} className={styles.item}>
                                <div className={styles.question} onClick={() => toggle(key)}>

                                    <button>{item.question}</button>
                                    {
                                        open === key ? <IoIosArrowUp /> : <IoIosArrowDown />
                                    }
                                </div>

                                <div
                                    ref={el => { refs.current[key] = el }}
                                    className={`${styles.answer}`}
                                >
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
