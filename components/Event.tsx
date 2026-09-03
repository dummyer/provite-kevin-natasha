"use client";

import Image from "next/image";
import FadeIn from "@/app/sections/FadeIn";
import "@/app/event.css";

type EventProps = {
    data: any;
};

type VenueConfig = {
    name: string;
    address: string[];
    mapUrl: string;
};

/* =========================================================
   VENUE CONFIG
   ========================================================= */

const VENUE_MAP: Record<string, VenueConfig> = {
    intercontinental: {
        name: "Intercontinental Hotel",

        address: [
            "Jalan Resor Dago Pakar Raya 2B Resor Dago Pakar,",
            "Jl. Raya Resort, Mekarsaluyu, Kec. Cimenyan, Kota Bandung,",
            "Jawa Barat 40198",
        ],

        mapUrl: "https://maps.app.goo.gl/bU3mAaD5C67HhULU7",
    },
};

/* =========================================================
   DUMMY DATA
   ========================================================= */

const dummyData = [
    {
        id: "1",
        name: "HOLY MATRIMONY",
        date: "2026-10-25T11:00:23",
        address:
            "InterContinental Hotel Dago Pakar Bandung, Jalan Raya Resort, Mekarsaluyu, Bandung City, West Java, Indonesia",
        addressName: "The Wedding Hall",
        latLong: "-6.8667338, 107.6423059",
    },
    {
        id: "2",
        name: "TEAPAI CEREMONY",
        date: "2026-10-25T16:00:23",
        address:
            "InterContinental Hotel Dago Pakar Bandung, Jalan Raya Resort, Mekarsaluyu, Bandung City, West Java, Indonesia",
        addressName: "The Grand Ballroom",
        latLong: "-6.8667338, 107.6423059",
    },
    {
        id: "3",
        name: "DINNER & RECEPTION",
        date: "2026-10-25T18:00:23",
        address:
            "InterContinental Hotel Dago Pakar Bandung, Jalan Raya Resort, Mekarsaluyu, Bandung City, West Java, Indonesia",
        addressName: "The Grand Ballroom",
        latLong: "-6.8667338, 107.6423059",
    },
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Event({ data }: EventProps) {
    const dataEvent = data.getGuestEventSessionByPinNew ?? [];
    const events =
        Array.isArray(dataEvent) && dataEvent.length > 0
            ? dataEvent
            : dummyData;

    /* =======================================================
       GROUP EVENT BERDASARKAN ADDRESS
       ======================================================= */

    const groupedEvents = events.reduce(
        (groups: Record<string, any[]>, event: any) => {
            const address = event?.address || "Unknown Venue";

            if (!groups[address]) {
                groups[address] = [];
            }

            groups[address].push(event);

            return groups;
        },
        {}
    );

    const venueGroups = Object.values(groupedEvents);

    return (
        <section
            id="eventdetail"
            className="
        relative
        w-full
        box-border
        bg-[#f8f8f6]
      "
        >
            {/* ===================================================
          BACKGROUND TEXTURE
         =================================================== */}

            <div
                className="
          absolute
          inset-0
          z-0
          opacity-50
          pointer-events-none
        "
            >
                <Image
                    src="/images/rsvp_bg.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* ===================================================
          OUTER FRAME
         =================================================== */}

            <div
                className="
          absolute
          inset-0
          z-30
          pointer-events-none
        "
            />

            {/* ===================================================
          CONTENT
         =================================================== */}

            <div
                className="
        event
          relative
          z-10

          w-full
          max-w-[700px]


          mx-auto
          box-border

          flex
          flex-col
          items-center

          px-[45px]
          py-[35px]

          md:pt-[60px]
          md:pb-[100px]

          text-center
        "
            >
                {/* =================================================
            THE VENUE
            TIDAK DI-FadeIn
           ================================================= */}

                <p className="title">
                    The Venue
                </p>

                {/* =================================================
            VENUE GROUPS
           ================================================= */}

                {venueGroups.map(
                    (
                        venueEvents: any[],
                        venueIndex: number
                    ) => {
                        const firstEvent =
                            venueEvents[0];

                        /*
                         * Venue config berdasarkan API address.
                         *
                         * Kalau ketemu helper:
                         * → pakai data dari VENUE_MAP
                         *
                         * Kalau tidak ketemu:
                         * → fallback ke API
                         */
                        const venue = getVenue(
                            firstEvent?.address,
                            firstEvent?.latLong
                        );

                        return (
                            <div
                                key={
                                    firstEvent?.address ||
                                    `venue-${venueIndex}`
                                }
                                className="
                  w-full

                  flex
                  flex-col
                  items-center
                "
                            >
                                {/* =========================================
                    VENUE ICON
                    TIDAK DI-FadeIn
                   ========================================= */}

                                <div
                                    className="
                    mt-5
                    mb-[30px]

                    w-[19px]
                    h-[20px]

                    flex
                    items-center
                    justify-center

                    md:mt-[40px]
                    md:mb-[40px]
                  "
                                >
                                    <Image
                                        src="/ico/ic_venue.png"
                                        alt="icon"
                                        width={19}
                                        height={20}
                                    />
                                </div>

                                {/* =========================================
                    VENUE NAME
                   ========================================= */}

                                <FadeIn>
                                    <h1
                                        className="
                    placename
                    min-h-[42px]
                    md:min-h-[70px]
                  "
                                    >
                                        {venue.name}
                                    </h1>
                                </FadeIn>

                                {/* =========================================
                    VENUE ADDRESS
                   ========================================= */}

                                <FadeIn>
                                    <p
                                        className="address"
                                    >
                                        {venue.address.map(
                                            (
                                                line: string,
                                                index: number
                                            ) => (
                                                <span
                                                    key={index}
                                                >
                                                    {line}

                                                    {index <
                                                        venue.address.length -
                                                        1 && (
                                                            <br />
                                                        )}
                                                </span>
                                            )
                                        )}
                                    </p>
                                </FadeIn>

                                {/* =========================================
                    GOOGLE MAPS
                   ========================================= */}

                                <FadeIn>
                                    <a
                                        href={venue.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                        hover
                                        mapbutton
                                        inline-flex
                                        items-center
                                        justify-center

                                        mt-[12px]
                                        md:mt-[15px]

                                        min-w-[125px]
                                        md:min-w-[146px]

                                        box-border
                                        rounded-[7px]
                                        bg-[#050505]

                                        text-center
                                    "
                                    >
                                        <span className="p-[8px_10px_7px] md:py-[12px_10px]">
                                            Click to open Google Maps
                                        </span>
                                    </a>
                                </FadeIn>

                                {/* =========================================
                    DIVIDER
                   ========================================= */}

                                <FadeIn>
                                    <div
                                        className="
                    w-[200px]
                    md:w-[286px]
                    h-px

                    my-[35px]

                    md:my-[50px]

                    bg-gradient-to-r
                    from-transparent
                    via-[#131313]
                    to-transparent
                  "
                                    />
                                </FadeIn>

                                {/* =========================================
                    EVENT SCHEDULE
                   ========================================= */}

                                <div
                                    className="
                    w-full

                    flex
                    flex-col
                    items-center

                    gap-[35px]

                    md:gap-[40px]
                  "
                                >
                                    {venueEvents.map(
                                        (event: any) => {
                                            const eventDate =
                                                new Date(
                                                    event.date
                                                );

                                            const time =
                                                eventDate.toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: false,
                                                    }
                                                );

                                            return (
                                                 <div
                                                 key={event.id}
                                                        className="
                                                    subevent
                                                        flex
                                                        flex-col
                                                        items-center
                                                        text-center
                                                    "
                                                    >
                                                        {/* Event Name */}

                                                        <FadeIn>
                                                            <h2
                                                            className="subevent_name"
                                                        >
                                                            {event.name}
                                                        </h2>

                                                        {/* Event Location */}

                                                        <p
                                                            className="subevent_address my-[7px_3px] md:my-[10px]"
                                                        >
                                                            at{" "}
                                                            {event.addressName}
                                                        </p>

                                                        {/* Event Time */}

                                                        <span
                                                            className="subevent_time"
                                                        >
                                                            @{time}
                                                        </span>
                                                        </FadeIn>
                                                    </div>
                                            );
                                        }
                                    )}
                                </div>

                                {/* =========================================
                    SPACE BETWEEN VENUES
                   ========================================= */}

                                {venueIndex <
                                    venueGroups.length - 1 && (
                                        <div
                                            className="
                      w-full
                      h-[0px]
                    "
                                        />
                                    )}
                            </div>
                        );
                    }
                )}
            </div>
        </section>
    );
}

/* =========================================================
   VENUE HELPER
   ========================================================= */

function getVenue(
    address: string,
    latLong?: string
): VenueConfig {
    /* =======================================================
       EMPTY ADDRESS
       ======================================================= */

    if (!address) {
        return {
            name: "The Venue",
            address: [],
            mapUrl: latLong
                ? `https://www.google.com/maps?q=${latLong}`
                : "https://maps.google.com",
        };
    }

    const lowerAddress = address.toLowerCase();

    /* =======================================================
       INTERCONTINENTAL
       ======================================================= */

    if (
        lowerAddress.includes(
            "intercontinental hotel"
        )
    ) {
        const config =
            VENUE_MAP.intercontinental;

        if (config) {
            return config;
        }
    }

    /* =======================================================
       FALLBACK KE API
  
       Kalau venue tidak ada di VENUE_MAP,
       otomatis ambil dari API.
       ======================================================= */

    return {
        name:
            address
                .split(",")[0]
                ?.trim() || "The Venue",

        address: address
            .split(",")
            .map(
                (part: string) =>
                    part.trim()
            )
            .filter(Boolean)
            .slice(0, 3),

        mapUrl: latLong
            ? `https://www.google.com/maps?q=${latLong}`
            : "https://maps.google.com",
    };
}