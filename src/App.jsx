import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Feed from "./components/ui/Feed/Feed";
import Header from "./components/ui/Header/Header";
import Scroll from "./components/Scroll";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === 'production',
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  }
});


function App() {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Header />
        <Feed />
        {/* <Scroll /> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
