import { configureStore } from "@reduxjs/toolkit";
import AdminAuth from "./AdminAuth";

const Store = configureStore(
    {reducer:{Admin:AdminAuth.reducer}}
)

export default Store