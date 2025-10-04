import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Rotations from './pages/Rotations.tsx';
import App from './App.tsx';
import AlgorithmsOne from './pages/AlgorithmsOne.tsx';
import AlgorithmsTwo from './pages/AlgorithmsTwo.tsx';
import AlgorithmsThree from './pages/AlgorithmsThree.tsx';
import Help from './pages/Help.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<App />}>
      <Route path = "/" element = {<Home />}></Route>
      <Route path = "rotations" element = {<Rotations />}></Route>
      <Route path = "algos-1" element = {<AlgorithmsOne />}></Route>
      <Route path = "algos-2" element = {<AlgorithmsTwo />}></Route>
      <Route path = "algos-3" element = {<AlgorithmsThree />}></Route>
      <Route path = "help" element = {<Help />}></Route>
      <Route path = "*" element = {<Navigate to = "/" />}></Route>
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </StrictMode>,
)
