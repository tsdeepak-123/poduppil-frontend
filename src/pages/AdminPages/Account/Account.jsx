import React from "react";
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AdminAccount from "../../../components/AdminComponents/AdminAccount/AdminAccount";

function Account() {
  return (
    <div>
      <Header  headers="ADMIN ACCOUNT"/>
      <AdminAccount />
      <div className="mt-52">
        <Footer />
      </div>
    </div>
  );
}

export default Account;
