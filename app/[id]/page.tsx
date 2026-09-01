import Home from "@/components";
import {
  getCurrentEvent,
  getEventContent,
} from "@/app/services/event";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getCurrentEvent(id);

  if (!event) {
    return <Home data={null} />;
  }

  const content = await getEventContent(event?.id || '');
  const parsedContent = content ?? null;

  return (
    <Home
      data={{
        dataEvent: event,
        dataContent: parsedContent,
      }}
    />
  );
}