
import Swal from "sweetalert2";
import { axiosUser,axiosAdmin } from "../Api/Api";

export default async function SwalMessage(url,name,action,admin=false){
    try {

      console.log(url,name,action);
        const result = await Swal.fire({
          title: `${action} the ${name} ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, ${action}!`,
        });
       console.log(result.isConfirmed);
        if (result.isConfirmed) {
          if(admin){
           const response= await axiosAdmin.patch(url)
           if(response.data.success){
            return response.data
           }
          }else{
            const response= await axiosUser.patch(url)
            if(response.data.success){
              Swal.fire(
                `${name} ${action} successfully` ,
                '',
                'success'
              )
             }
          } 

        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
}