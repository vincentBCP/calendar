import { useState } from "react";
import { Calendar } from "../lib/main";
import { ICalendarEvent } from "../lib/interfaces/ICalendarEvent";
import { format } from "date-fns";
import { cloneDeep } from "lodash";

const App: React.FC = () => {
  const [events, setEvents] = useState<ICalendarEvent[]>([
    {
      id: "1",
      title: "1 Lorem ipsum dolor sit amet",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "08:00",
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
    {
      id: "2",
      title: "2 Lorem ipsum dolor sit amet",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "08:00",
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
    {
      id: "3",
      title: "3 Lorem ipsum dolor sit amet",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "08:00",
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
  ]);

  return (
    <Calendar
      onBack={() => {}}
      events={events}
      onAddEvent={(event) =>
        new Promise((resolve) => {
          setTimeout(() => {
            setEvents((events) => [...events, event]);
            resolve(true);
          }, 1000);
        })
      }
      onDeleteEvent={() => Promise.resolve(true)}
      onUpdateEvent={(event) =>
        new Promise((resolve) => {
          setTimeout(() => {
            setEvents((events) => {
              const index = events.findIndex((e) => e.id === event.id);
              const updatedEvents = cloneDeep(events);

              if (index === -1) return updatedEvents;

              updatedEvents[index] = cloneDeep(event);

              return updatedEvents;
            });
            resolve(true);
          }, 1000);
        })
      }
    />
  );
};

export default App;
