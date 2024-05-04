import React from "react";
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AdminAccount from "../../../components/AdminComponents/AdminAccount/AdminAccount";

function Account() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header  headers="ADMIN ACCOUNT"/>
      <AdminAccount />
        <Footer />
      </div>
  );
}

export default Account;
