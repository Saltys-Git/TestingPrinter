"use client";
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Br, Cut, Line, Printer, render, Row, Text } from 'react-thermal-printer';

export default function Home() {
    const receipt = (
        <Printer type="epson" width={42} characterSet="korea" debug={true}>
            <Text size={{ width: 2, height: 2 }}>9,500원</Text>
            <Text bold={true}>결제 완료</Text>
            <Br />
            <Line />
            <Row left="결제방법" right="체크카드" />
            <Row left="카드번호" right="123456**********" />
            <Row left="할부기간" right="일시불" />
            <Row left="결제금액" right="9,500" />
            <Row left="부가세액" right="863" />
            <Row left="공급가액" right="8,637" />
            <Line />
            <Row left={<Text bold={true}>맛있는 옥수수수염차 X 2</Text>} right="11,000" />
            <Row left="(-) 할인" right="- 500" />
            <Br />
            <Line />
            <Row left={<Text bold={true}>합계</Text>} right="9,500" />
            <Row left="(-) 할인 2%" right="- 1,000" />
            <Line />
            <Row left="대표" right="김대표" />
            <Row left="사업자등록번호" right="000-00-00000" />
            <Row left="대표번호" right="0000-0000" />
            <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
            <Line />
            <Br />
            <Text align="center">Wifi: some-wifi / PW: 123123</Text>
            <Cut />
        </Printer>
    );

    const [port, setPort] = useState<SerialPort>();
    const { mutateAsync: print, isLoading: isPrinting } = useMutation(async () => {
        let _port = port;
        if (_port == null) {
            _port = await navigator.serial.requestPort();
            await _port.open({ baudRate: 9600 });
            setPort(_port);
        }

        const writer = _port.writable?.getWriter();
        if (writer != null) {
            const data = await render(receipt);

            await writer.write(data);
            writer.releaseLock();
        }
    });

    return (
        <main>
            {/*<div>{receipt}</div>*/}
            <div style={{ marginTop: 24 }}>
                <button disabled={isPrinting} onClick={() => print()}>
                    {isPrinting ? 'Printing...' : 'Print'}
                </button>
            </div>
        </main>
    );
}