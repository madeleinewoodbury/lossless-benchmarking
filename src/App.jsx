import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
const App = () => {

  return (
    <AppProvider>
      <main className="container mx-auto">
        <Home />
      </main>
    </AppProvider>
  );
};
export default App;
