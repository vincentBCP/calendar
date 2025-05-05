import {
  Button,
  ColorPicker,
  DateInput,
  Textfield,
  TimeInput,
} from "@vincentbcp/components-library";
import { ICalendarEvent } from "../interfaces/ICalendarEvent";
import { useState } from "react";

const EventForm: React.FC<{
  event: ICalendarEvent;
  onChange: (event: ICalendarEvent) => void;
  onSubmit: (event: ICalendarEvent) => Promise<boolean>;
  onDelete: (event: ICalendarEvent) => void;
}> = (props) => {
  const { event, onChange, onSubmit, onDelete } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (
      !event.title ||
      !event.date ||
      !event.time ||
      !event.bgColor ||
      !event.textColor
    ) {
      alert("Invalid event.");
      return;
    }

    setLoading(true);

    onSubmit(event);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Textfield
        name="Title"
        value={event.title || ""}
        onChange={(value) => onChange({ ...event, title: value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <DateInput name="Date" value={event.date} disabled />
        <TimeInput
          name="Time"
          value={event.time || ""}
          onChange={(value) => onChange({ ...event, time: value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ColorPicker
          name="Background"
          value={event.bgColor || ""}
          onChange={(value) => onChange({ ...event, bgColor: value })}
        />
        <ColorPicker
          name="Text Color"
          value={event.textColor || ""}
          onChange={(value) => onChange({ ...event, textColor: value })}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleSubmit} loading={loading} disabled={loading}>
          {event.id !== "new_event" ? "Update" : "Add"}
        </Button>
        {event.id !== "new_event" && (
          <Button
            className="!bg-transparent !border-solid !outline-solid !outline-offset-[-2px] !outline-red-500 !text-red-500 hover:!bg-red-300"
            onClick={() => {
              const c = confirm("Are you sure you want to delete event?");

              if (!c) return;

              onDelete(event);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
