import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLandingPage} from './components/landingPage/landingpagelayout';
import {LandingPageHome} from './components/landingPage/children/landingPageHome';
import {allRoutes, childrenRenderer, findRouteIndex} from "./models/allRoutes";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<App/>}>
                <Route path="/*" element={<MainLandingPage/>}>
                    <Route index element={<LandingPageHome/>}/>
                    {allRoutes.map((single, index) => (
                        <Route key={index} path={single.path} element={single.element}>
                            {single.children ? findRouteIndex(single.children) : null}
                            {single.children ? childrenRenderer(single.children) : null}
                        </Route>
                    ))}
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
