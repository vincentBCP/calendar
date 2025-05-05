import { useState } from "react";
import { Calendar } from "../lib/main";
import { ICalendarEvent } from "../lib/interfaces/ICalendarEvent";
import { format } from "date-fns";

const App: React.FC = () => {
  const [events, setEvents] = useState<ICalendarEvent[]>([
    {
      id: "1",
      title: "Lorem ipsum dolor sit amet",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "08:00",
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
    {
      id: "2",
      title: "Lorem ipsum dolor sit amet",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "08:00",
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
    {
      id: "3",
      title: "Lorem ipsum dolor sit amet",
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
      onUpdateEvent={() => Promise.resolve(true)}
    />
  );
};

export default App;
