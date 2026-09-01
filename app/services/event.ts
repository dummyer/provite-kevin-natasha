const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function parseResponse(res: Response) {
  if (!res.ok) {
    return null;
  }

  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function getCurrentGuest(
  url: string,
  pin: number | string
) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetCurrentGuest?url=${encodeURIComponent(url)}&pin=${pin}`,
      
      {
        cache: "no-store",
      }
    );
    return await parseResponse(res);
  } catch (err) {
    console.error("GetCurrentGuest:", err);
    return null;
  }
}

export async function getCurrentEvent(url: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetCurrentEvent?url=${url}`,
      {
        cache: "no-store",
      }
    );

    return await parseResponse(res);
  } catch (err) {
    console.error("GetCurrentEvent:", err);
    return null;
  }
}

export async function getGuestEventSessionByPinNew(pin: number | string, eventId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetGuestEventSessionByPinNew?pin=${pin}&eventId=${eventId}`,
      {
        cache: "no-store",
      }
    );

    return await parseResponse(res);
  } catch (err) {
    console.error("GetGuestEventSessionByPinNew:", err);
    return null;
  }
}

export async function getEventContent(id: number | string) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetEventContent?id=${id}`,
      {
        cache: "no-store",
      }
    );

    return await parseResponse(res);
  } catch (err) {
    console.error("GetEventContent:", err);
    return null;
  }
}

export async function getAllPersonalGuestMessages(eventid: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetAllPersonalGuestMessages?eventId=${eventid}`,
      {
        cache: "no-store",
      }
    );

    return await parseResponse(res);
  } catch (err) {
    console.error("GetAllPersonalGuestMessages:", err);
    return null;
  }
}

export async function openInvitation(
  pin: number | string,
  eventId: number | string
) {
  try {
    const res = await fetch(`${API_URL}/api/Event/OpenInvitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        pin,
      }),
    });

    return await parseResponse(res);
  } catch (err) {
    console.error("OpenInvitation:", err);
    return null;
  }
}

export async function getSmartRSVPData(
  url: string,
  pin: number | string
) {
  try {
    const res = await fetch(
      `${API_URL}/api/Event/GetSmartRSVPData?url=${encodeURIComponent(
        url
      )}&pin=${pin}`,
      {
        cache: "no-store",
      }
    );

    return await parseResponse(res);
  } catch (err) {
    console.error("GetSmartRSVPData:", err);
    return null;
  }
}

export async function submitRSVP(data: any) {
  console.log(data)
  try {
    // const guest = await getCurrentGuest(url, pin);

    // if (!guest) {
    //   return null;
    // }
    const payload = {
      eventId: data?.dataEvent?.id,
      url: data?.dataEvent?.url,
      pin: data?.dataGuest?.pin ?? 0,

      name: data?.dataGuest?.name ?? "",
      phone: data?.dataGuest?.phone ?? "",

      status: data.attendStatus,
      maybeDate: "",
      maybeNote: "",

      questionList: [],
    };
    console.log('payload', payload)

    /* /Event/InputRSVP */
    const res = await fetch(`${API_URL}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await parseResponse(res);
  } catch (err) {
    console.error("SubmitRSVP:", err);
    return null;
  }
}

export async function submitPersonalGuestMessage(data: any) {
    try {
        const payload = {
            eventId: data?.dataContent?.eventId,
            mediaFileId: null,
            name: data?.name ?? "",
            message: data?.message ?? "",
            status: 1,
            type: 1,
        };

        //console.log("Submit wish payload:", payload);

        const res = await fetch(
            `${API_URL}/api/Event/SubmitPersonalGuestMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        return await parseResponse(res);
    } catch (err) {
        console.error("SubmitPersonalGuestMessage:", err);
        return null;
    }
}