import React from "react";
import MainPage from "./containers/MainPage";
import Header from "./components/others/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainPage />
    </>
  );
};

export default App;
