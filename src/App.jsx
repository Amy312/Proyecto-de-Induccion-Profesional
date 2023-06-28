import { BrowserRouter } from "react-router-dom";
import TaskProvider from './context/ContextProvider';
import { AppRouter } from './router/AppRouter';
import { useState } from "react";

function App() {
  
  return (
    <TaskProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
    </TaskProvider>
  );
}

export default App;