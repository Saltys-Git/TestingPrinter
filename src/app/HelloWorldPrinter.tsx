'use client'
import useScanDetection from 'use-scan-detection';
import {useEffect, useState} from "react";


export default function HelloWorldPrinter() {
    const [value, setValue] = useState("asd");
    const [value2, setValue2] = useState("asd");
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    let barcodeScan = ""
    useEffect(()=>{

        function handleKeyDown(e: any) {
            setValue2(e.key)
            if (e.key === 13 && barcodeScan.length > 3) {
                handleScan(barcodeScan)
                return
            }
            if (e.key === 16) {
                return
            }

            barcodeScan += e.key

            setTimeout(() => {
                barcodeScan = ""
            },100)
        }

        if (isBrowser()) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return function cleanup() {
            if (isBrowser()) {
                document.removeEventListener("keydown", handleKeyDown)
            }
        }
    })
    const handleScan = (data: string) => {
        setValue(data);
    }
    return (
        <div>
            <p className="text-4xl">{value}</p>
            <p className="text-4xl">{value2}</p>
        </div>
    );
}
