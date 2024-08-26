"use client"

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<null | any>(null)
  const [data, setData] = useState<null | any>(null)


  useEffect(() => {
    getApiData()
    if (WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])


  const getApiData = async () => {
    const res = await fetch("https://api.telegram.org/7529380285:AAHj4qaLHkTo6IWfYWHXqspZ29fn05Wq_BI/getMe")
    const resParsed = await res.json()
    setData(resParsed)
  }
  return (
    <>
    <h1>new changes</h1>
      {userData ?
        <>
          <ul>
            <li>ID: {userData.id}</li>
            <li>Name: {userData.first_name}  {userData.last_name}</li>
            <li>Is premium: {userData.is_premium}</li>
          </ul>

          <p> data: {data}</p>
        </>
        :
        <h1>Loading ...</h1>}
    </>
  );
}
