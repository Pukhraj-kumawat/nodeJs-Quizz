import { useState, useEffect } from "preact/hooks";
import AuthPage from "./components/auth";
import Home from "./components/home";
import { DataProvider } from "./components/dataContext";


export function App() {
  const [isloggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  

  return (
    <DataProvider>
      {isloggedIn ? (
        <Home setIsLoggedIn = {setIsLoggedIn} />
      ) : (
        <AuthPage data={{ setIsLoggedIn: setIsLoggedIn }} />
      )}
    </DataProvider>
  );
}
