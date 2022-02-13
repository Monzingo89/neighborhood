import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Neighborhood/Home';
import NeighborhoodPage from './pages/Neighborhood/Neighborhood';
import LivingRoomPage from './pages/House/LivingRoom';
import SelectionPage from './pages/House/SelectionPage';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="neighborhood">
                    <Route index element={<NeighborhoodPage />} />
                    <Route path="/neighborhood/house/:number" element={<LivingRoomPage />} />
                    <Route path="/neighborhood/house/selection/:string" element={<SelectionPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Application;