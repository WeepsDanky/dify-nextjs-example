'use client'; 

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"; 

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const fetchSummary = async () => {
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputValue }),
    });
  
    try {
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const sendEmail = async () => {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_text: inputValue }),
    });

    try{ 
    const data = await response.json();
      setEmailStatus(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button onClick={fetchSummary} className="m-2 p-2 bg-blue-500 text-white rounded">
            Get Summary
          </button>
          <button onClick={sendEmail} className="m-2 p-2 bg-green-500 text-white rounded">
            Send Email
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5 w-full max-w-5xl">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text to be summarized here..."
        />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5">
        {summary && <div className="text-blue-500">{JSON.stringify(summary)}</div>}
        {emailStatus && <div className="text-green-500">{JSON.stringify(emailStatus)}</div>}
      </div>
    </main>
  );
}