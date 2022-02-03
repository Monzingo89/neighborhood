import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import NeighborhoodPage from './pages/Neighborhood';
import RoomPage from './pages/Room';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="neighborhood">
                    <Route index element={<NeighborhoodPage />} />
                    <Route path="/neighborhood/room/:number" element={<RoomPage />} />
                </Route>

                {/* <Route path="layout" element={<LayoutComponent />}>
                    <Route index element={<NeighborhoodPage />} />
                    <Route path=":number" element={<NeighborhoodPage />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Application;