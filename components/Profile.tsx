"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import "@/app/profile.css";

type ProfileProps = {
    data: any;
};

const Profile = forwardRef<HTMLElement, ProfileProps>(({ data }, ref) => {
    const groomName = data?.dataEvent?.groomFullName ?? "Kevin Tanvis";
    const groomParents = data?.dataEvent?.groomParent ?? "Mr. Chin Kit Liong  & Mrs. Huang Hui Cong";
    const brideName = data?.dataEvent?.brideFullName ?? "Natasha Anya Iskandar";
    const brideParents = data?.dataEvent?.brideParent ?? "Mr. Tjandra Iskandar  & Mrs. Tien Juliani";
    return (
        <div className="profile w-full relative bg-white" id="profile">
            {/* Background layer, opacity 50% */}
            <div
                className="absolute inset-0 opacity-50 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/images/bg_profile.png')` }}
            />

            {/* Content layer, full opacity */}
            <div className="relative z-10 flex flex-col h-full w-full p-[33px_29px_55px_32px] lg:p-[60px_65px_178px_65px]">
                <div className="flex justify-between mb-[47px] lg:mb-[121px]">
                    <div className="titledesc max-w-[128px] lg:max-w-[199px] h-auto text-left my-auto">
                        We cordially invite you to witness the union of
                    </div>
                    <div>
                        <Image src="/images/logo_hero_black.png" alt="Logo" width={30} height={29}
                            className="lg:w-[52px] lg:h-[52px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    {/* Groom */}
                    <div className="items-center newperson flex flex-col h-full w-full">
                        <Image src="/images/profile_groom.png" alt="Logo" width={168} height={223}
                            className="lg:w-[266px] lg:h-[347px]"
                        />
                        <div className="label my-[15px_10px] lg:my-[30px_12px]">The Groom</div>
                        <div className="name min-h-[42px] lg:min-h-[70px]">{groomName}</div>
                        <div className="sibling my-[10px_5px] lg:my-[15px_8px]">The first son of two siblings.</div>
                        <div className="parents">{groomParents}</div>
                    </div>

                    {/* --------- */}
                    <div className="items-center flex flex-col lg:my-auto lg:mt-0 lg:pt-[173px] my-[35px]">
                        <Image src="/ico/ic_flower.png" alt="Logo" width={20} height={20}
                            className="lg:w-[52px] lg:h-[52px] w-5 h-5 object-contain"
                        />
                    </div>
                    {/* --------- */}

                    {/* Bride */}
                    <div className="items-center newperson flex flex-col h-full w-full">
                        <Image src="/images/profile_bride.png" alt="Logo" width={168} height={223}
                            className="lg:w-[266px] lg:h-[347px]"
                        />
                        <div className="label my-[15px_10px] lg:my-[30px_12px]">The Bride</div>
                        <div className="name min-h-[42px] lg:min-h-[70px]">{brideName}</div>
                        <div className="sibling my-[10px_5px] lg:my-[15px_8px]">The first daughter of three siblings.</div>
                        <div className="parents">{brideParents}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

Profile.displayName = "Profile";

export default Profile;