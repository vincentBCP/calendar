import {
  Button,
  DateInput,
  Textfield,
  TimeInput,
} from "@vincentbcp/components-library";
import { format } from "date-fns";

const EventForm: React.FC<{ date: Date }> = (props) => {
  const { date } = props;

  return (
    <div className="flex flex-col gap-6 p-6">
      <Textfield name="Title" />
      <div className="grid grid-cols-2 gap-4">
        <DateInput name="Date" value={format(date, "yyyy-MM-dd")} disabled />
        <TimeInput name="Time" />
      </div>
      <Button>Add</Button>
    </div>
  );
};

export default EventForm;
