import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CalendarView } from './components/CalendarView';
import { MonthSelector } from './components/MonthSelector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MonthSelector />} />
        <Route path="/mes/:monthSlug" element={<CalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;
