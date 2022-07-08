import Tasks from './components/tasks';
import TaskContextProvider from './context/TaskContext';

const App = () => {
  return (
    <TaskContextProvider>
      <Tasks />
    </TaskContextProvider>
  );
};

export default App;
