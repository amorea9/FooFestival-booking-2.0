import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";
import favicon from "../assets/foofest-favicon.png";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>FOOFEST | The best damned festival</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="FOOFEST | The best damned festival - book your tickets now " />
        <meta name="keywords" content="HTML, SASS, JavaScript, React.js, Next.js Exam project" />
        <link rel="shortcut icon" type="image/jpg" src={favicon} />
      </Head>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
