import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

function App() {
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <ToastContainer />
      {isLoading && <LoadingSpinner />}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
