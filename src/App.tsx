import { Calendar } from "../lib/main";

const App: React.FC = () => {
  return (
    <Calendar
      onBack={() => {}}
      events={[]}
      onAddEvent={() => Promise.resolve(true)}
      onDeleteEvent={() => Promise.resolve(true)}
      onUpdateEvent={() => Promise.resolve(true)}
    />
  );
};

export default App;
