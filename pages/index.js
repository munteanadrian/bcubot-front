import Head from "next/head";
import App from "./App";

export default function Home() {
  return (
    <>
      <Head>
        <title>BCUBOT | Adrian Muntean</title>
        <meta
          name="description"
          content="A simple bot to automate library seat bookings"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App />
      </main>
    </>
  );
}
