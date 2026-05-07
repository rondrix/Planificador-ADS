import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { CalendarView } from './components/CalendarView';
import { AdminPanel } from './components/AdminPanel';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
