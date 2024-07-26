import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="h-[10vh] border-b-[0.5px] border-slate-200 shadow-md w-full flex items-center justify-between px-12 text-lg">

            <div className="flex gap-10" >
                <Link className="hover:underline" to={"/"} >
                    Home
                </Link>

                <Link className="hover:underline" to={"/check-traffic"}>
                    Check Traffic
                </Link>
            </div>

            <div>
                Shivansh ❤️ Rehaan
            </div>


        </div>
    )
}