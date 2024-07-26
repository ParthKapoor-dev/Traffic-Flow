import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="h-[10vh] border-b-[0.5px] border-slate-200 shadow-md w-full flex items-center px-12 gap-10 text-lg">


            <Link className="hover:underline" to={"/"} >
                Home
            </Link>

            <Link className="hover:underline" to={"/check-traffic"}>
                Check Traffic
            </Link>

            

        </div>
    )
}