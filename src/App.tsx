import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Quotes from './Components/Quotes';
import EditQuote from './Components/EditQuote';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Quotes />} />
            <Route path="/create" element={<EditQuote />} />
            <Route path="/edit-quote/:quoteId" element={<EditQuote />} />
        </Routes>
    );
}

export default App;
