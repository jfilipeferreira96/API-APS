import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'

// pages
import Home from './pages/Home';
import Activity from './pages/Activity';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity/:activityID/:inveniraStdID" element={<Activity />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App