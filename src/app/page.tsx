"use client"

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<null | any>(null)
  const [data, setData] = useState<null | any>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
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

      if (typeof window !== 'undefined' && WebApp) {
        WebApp.openInvoice(data?.result);
      }
      console.log("result ", data?.result);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }

    setData(data);
  };

  return (
    <>
      {userData ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  name
                </th>
                <td className="px-6 py-4">
                  {userData.first_name} {userData.last_name}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ID
                </th>
                <td className="px-6 py-4">
                  {userData.id}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Is premium
                </th>
                <td className="px-6 py-4">
                  {userData.is_premium ?? false}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}

      <h1>new changes 2</h1>
      <button onClick={openInvoice} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 self-center">pay</button>
    </>
  );
}
