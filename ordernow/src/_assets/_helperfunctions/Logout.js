import Cookies from "js-cookie";
export const Logout=()=>{
    Cookies.remove("order_now");
}