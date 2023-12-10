
import Swal from "sweetalert2";
import { axiosUser } from "../Api/Api";

export default async function SwalMessage(url,name,action){
    try {
        const result = await Swal.fire({
          title: `${action} the ${name} ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, ${action}!`,
        });
  
        if (result.isConfirmed) {
          await axiosUser.patch(url);
          Swal.fire(
            `${name} ${action} successfully` ,
            '',
            'success'
          )
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
}