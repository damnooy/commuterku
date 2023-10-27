import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import JadwalKereta from './JadwalKereta'
import InfoTarif from './InfoTarif';
import PetaRute from './PetaRute';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JadwalKereta />,
  },
  {
    path: "/tarif",
    element: <InfoTarif />,
  },
  {
    path: "/rute",
    element: <PetaRute />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
