"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";

type GiftProps = {
    data: any;
};

// ⚠️ DUMMY DATA — cuma buat testing tampilan 2-3 rekening.
// HAPUS blok ini dan baris `bankAccounts` yang pakai DUMMY_ACCOUNTS
// kalau udah selesai testing, balikin ke data asli dari API.
// const DUMMY_ACCOUNTS = [
//     { id: "1", bankName: "BCA (IDR)", accountNumber: "7771827580", accountName: "Wilson Susanto" },
//     { id: "2", bankName: "Mandiri (IDR)", accountNumber: "1234567890", accountName: "Steffanny" },
//     { id: "3", bankName: "BNI (IDR)", accountNumber: "0987654321", accountName: "Wilson & Steffanny" },
// ];

const Gift = forwardRef<HTMLElement, GiftProps>(({ data }, ref) => {
    const bankAccounts: any[] = data?.dataContent?.electronicGivings ?? [];
    //const bankAccounts: any[] = DUMMY_ACCOUNTS;

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (norek: string, index: number) => {
        try {
            await navigator.clipboard.writeText(norek);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Gagal copy:", err);
        }
    };

    const displayedAccounts = bankAccounts.length > 0
        ? bankAccounts
        : [{ bankName: "BCA (IDR)", accountNumber: "7771827580", accountName: "Wilson Susanto" }];

    return (
        <span ref={ref}>
            <div className="gift" id="gift">    
                <div className="min-w-[300px] lg:min-w-[447px] items-center flex flex-col mt-[118px] lg:mt-[194px]">
                    <div className="lg:h-[76px] h-[57px]">
                        <h2 className="title">Wedding Gift</h2>
                    </div>
                  

                    <div className="desc mb-[40px] h-[112px] lg:mb-[57px] w-[227px] m-auto lg:w-[447px]">
                        <p>
                            Your presence and prayers are the greatest blessing to us. Should you wish to send a gift, the details are provided below for your convenience.
                        </p>
                    </div>

                    <div className="w-[75%] lg:w-full">
                        {displayedAccounts.map((acc, index) => {
                            const norek = acc?.accountNumber ?? "";
                            const isCopied = copiedIndex === index;

                            return (
                                <div key={acc?.id ?? index}>
                                    <div
                                        className="flex items-center pb-3 lg:pb-2 border-b border-[#4D4D4D] w-full"
                                        style={{ justifyContent: 'space-between' }}
                                    >
                                        <p className="text-left rekening">
                                            {acc?.bankName ?? "BCA (IDR)"}<br />
                                            <span className="norek">{norek}</span><br />
                                            <span className="atas_nama">{acc?.accountName ?? ""}</span>
                                        </p>
                                        <button
                                            className="copy hover"
                                            type="button"
                                            onClick={() => handleCopy(norek, index)}
                                        >
                                            {isCopied ? (
                                                <>
                                                    <span className="text-[#5F2D1C]">✓ </span>
                                                    <span>COPIED!</span>
                                                </>
                                            ) : (
                                                "COPY"
                                            )}
                                        </button>
                                    </div>
                                    {index < displayedAccounts.length - 1 && <br />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </span>
    );
});

Gift.displayName = "Gift";

export default Gift;