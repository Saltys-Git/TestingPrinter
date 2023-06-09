'use client'
import {useEffect, useState} from "react";

let barcodeScan = ""
export default function HelloWorldPrinter() {
    const [value, setValue] = useState("asd");
    const [value2, setValue2] = useState("asd");
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    useEffect(()=>{

        function handleKeyDown(e: any) {
            setValue2(e.key)
            if (e.key === "Enter" && barcodeScan.length > 5) {
                handleScan(barcodeScan)
                return
            }
            if (e.key === "Shift") {
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
            <p className="text-4xl text-black">{value}</p>
            <p className="text-4xl text-green-800">{value2}</p>
        </div>
    );
}
