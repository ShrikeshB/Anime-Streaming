// import { useState } from "react";
// import axio from "axios";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./Pages/Explore";
import About from "./Pages/About";
import Home from "./Pages/Home";
import AnimeDesc from "./Pages/AnimeDesc";
import Episode from "./Pages/Episode";
import Admin from "./Admin/Admin";
import AddAnime from "./Admin/Components/AddAnime";
import AddEpisode from "./Admin/Components/AddEpisode/AddEpisode";
import Dashboard from "./Admin/Components/Dashboard";
import AnimeList from "./Admin/Components/AnimeList";
import Episodes from "./Admin/Components/AddEpisode/Episodes";
import Auth from "./Pages/Auth";
import PlayEpisode from "./Pages/PlayEpisode";
import Payment from "./Pages/Payment";
import Genre from "./Pages/Genre";
import Plans from "./Pages/Plans";
import Search from "./Pages/Search";
import AccSettings from "./Pages/Acc-Settings/AccSettings";
import BillingInfo from "./Pages/Acc-Settings/BillingInfo";
import EditEpisode from "./Admin/Components/DeleteEpisode/EditEpisode";
import Chats from "./Pages/Chats";
import News from "./Pages/News";
import NewsDetails from "./Pages/NewsDetails";
import Test from "./Pages/Test";
import AddNews from "./Admin/Components/AddNews/AddNews";
import DeleteNews from "./Admin/Components/DeleteNews/DeleteNews";
import NewsEdit from "./Admin/Components/NewsEdit/NewsEdit";
import ForgotPassword from "./Pages/ForgotPassword";
import PaymentStatus from "./Pages/PaymentStatus";
import AdminAuth from "./Admin/Components/AdminAuth/AdminAuth";
import Contact from "./Pages/Contact";
import WatchList from "./Pages/WatchList";
import UserList from "./Admin/Components/UserList/UserList";
import ListAnimeCat from "./Admin/Components/ListAnimeCat/ListAnimeCat";

function App() {
  // Routes are created here...
  const r = createBrowserRouter([
    {
      path: "/animeDesc/:AID/:Title",
      element: <AnimeDesc />,
    },
    {
      path: "/explore",
      element: <Explore />,
      errorElement: (
        <>
          <h1>No Data here..</h1>
        </>
      ),
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "",
      element: <Home />,
    },

    {
      path: "/Admin",
      element: <Admin />,
    },
    {
      path: "/AddAnime",
      element: <AddAnime />,
    },

    {
      path: "/AddEpisode",
      element: <AddEpisode />,
    },

    {
      path: "/AddEpisode/:key",
      element: <AddEpisode />,
    },

    {
      path: "/Dashboard",
      element: <Dashboard />,
    },

    {
      path: "/AnimeList",
      element: <AnimeList />,
    },
    {
      path: "/AnimeList/:key",
      element: <AnimeList />,
    },

    {
      path: "/Episodes/:AID/:AnimeName",
      element: <Episodes />,
      errorElement: (
        <>
          <h1>No Episodes Added..</h1>
        </>
      ),
    },
    {
      path: "/Episode/:AID/:Title",
      element: <Episode />,
    },
    {
      path: "/PlayEpisode/:EpNo/:AID/:SNo/:EID",
      element: <PlayEpisode />,
    },
    {
      path: "/Auth",
      element: <Auth />,
    },
    {
      path: "/Payment",
      element: <Payment />,
    },
    {
      path: "/Genre/:GenreName",
      element: <Genre />,
    },
    {
      path: "/Plans",
      element: <Plans />,
    },
    {
      path: "/Search/:key",
      element: <Search />,
    },
    {
      path: "/WatchList",
      element: <WatchList />,
    },
    {
      path: "/AccountSettings",
      element: <AccSettings />,
    },
    {
      path: "/BillingInfo",
      element: <BillingInfo />,
    },
    {
      path: "/EditEpisode/:AID",
      element: <EditEpisode />,
    },
    {
      path: "/EditEpisode/:AID/:key",
      element: <EditEpisode />,
    },
    {
      path: "/Chats",
      element: <Chats />,
    },
    {
      path: "/News",
      element: <News />,
    },
    {
      path: "/News/:genre",
      element: <News />,
    },

    {
      path: "/NewsDetails/:NID",
      element: <NewsDetails />,
    },
    {
      path: "/AddNews",
      element: <AddNews />,
    },
    {
      path: "/Test",
      element: <Test />,
    },

    {
      path: "/DeleteNews",
      element: <DeleteNews />,
    },
    {
      path: "/DeleteNews/:key",
      element: <DeleteNews />,
    },
    {
      path: "/NewsEdit/:NID",
      element: <NewsEdit />,
    },
    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/PaymentStatus/:response",
      element: <PaymentStatus />,
    },
    {
      path: "/AdminAuth",
      element: <AdminAuth />,
    },
    {
      path: "/Contact",
      element: <Contact />,
    },
    {
      path:"/UserList",
      element:<UserList/>
    },
    {
      path:"/ListAnimeCat",
      element:<ListAnimeCat/>
    }
  ]);

  return (
    <>
      <RouterProvider router={r} />
    </>
  );
}

export default App;
