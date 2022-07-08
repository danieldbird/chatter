import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container grow p-4 mx-auto">{children}</main>
      <Footer />
    </>
  );
}
