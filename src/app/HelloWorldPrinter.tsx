'use client'
import useScanDetection from 'use-scan-detection';
import {useState} from "react";
export default function HelloWorldPrinter() {
    const [value, setValue] = useState<any>("");
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    useScanDetection({
        onComplete: setValue,
        minLength: 13 // EAN13
    })

    return (
        <input
            value={value}
            type="text"
        />
    );
}
