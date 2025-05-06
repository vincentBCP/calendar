import {
  Button,
  ColorPicker,
  DateInput,
  Dialog,
  Textfield,
  TimeInput,
} from "@vincentbcp/components-library";
import { ICalendarEvent } from "../interfaces/ICalendarEvent";
import { useState } from "react";

const EventDialog: React.FC<{
  title: string;
  open?: boolean;
  onClose: () => void;
  event: ICalendarEvent;
  onChange: (event: ICalendarEvent) => void;
  onSubmit: (event: ICalendarEvent) => Promise<boolean>;
  onDelete: (event: ICalendarEvent) => void;
}> = (props) => {
  const { open, title, onClose, event, onChange, onSubmit, onDelete } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!event.title || !event.date || !event.bgColor || !event.textColor) {
      alert("Invalid event.");
      return;
    }

    setLoading(true);

    onSubmit(event);
  };

  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      actions={
        <>
          {event.id !== "new_event" && (
            <Button
              rounded
              variant="outlined"
              color="error"
              onClick={() => {
                const c = confirm("Are you sure you want to delete event?");

                if (!c) return;

                onDelete(event);
              }}
            >
              Delete
            </Button>
          )}
          <Button
            rounded
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            {event.id !== "new_event" ? "Update" : "Add"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Textfield
          required
          name="Title"
          value={event.title || ""}
          onChange={(value) => onChange({ ...event, title: value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <DateInput required name="Date" value={event.date} disabled />
          <TimeInput
            name="Time"
            value={event.time || ""}
            onChange={(value) => onChange({ ...event, time: value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            required
            name="Background"
            value={event.bgColor || ""}
            onChange={(value) => onChange({ ...event, bgColor: value })}
          />
          <ColorPicker
            required
            name="Text Color"
            value={event.textColor || ""}
            onChange={(value) => onChange({ ...event, textColor: value })}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EventDialog;
