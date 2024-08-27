"use client"

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<null | any>(null)
  const [data, setData] = useState<null | any>(null)


  useEffect(() => {
    // openInvoice()
    if (WebApp.initDataUnsafe?.user) {
      // WebApp.invo()
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])


  const openInvoice = async () => {
    try {
      const response = await fetch("https://api.telegram.org/bot7529380285:AAHj4qaLHkTo6IWfYWHXqspZ29fn05Wq_BI/createInvoiceLink", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'test item',
          description: 'test description',
          payload: 'unique_payload_identifier',
          provider_token: '',
          currency: 'XTR',
          prices: [
            {
              label: 'Breakfast included',
              amount: 1000,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Invoice created:', data);
      WebApp.openInvoice(data?.result)
      console.log("result ",data?.result)
      // Handle the created invoice, e.g., open it in a WebView or redirect the user
    } catch (error) {
      console.error('Error creating invoice:', error);
    }

    setData(data)
  };

  return (
    <>
      <>
        <h1>new changes 2</h1>
        <button onClick={openInvoice}>pay</button>
      </>
      {userData ?
        <>
          <ul>
            <li>ID: {userData.id}</li>
            <li>Name: {userData.first_name}  {userData.last_name}</li>
            <li>Is premium: {userData.is_premium}</li>
          </ul>

          <p> Invoice data: {data}</p>
        </>
        :
        <h1>Loading ...</h1>}
    </>
  );
}
