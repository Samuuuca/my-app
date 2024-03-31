import Link from "next/link"
import "./style/Navbar.css"

export default function Navbar(){


    return(

        <nav>
            <Link href={"/"}> <p>Player de Musica </p> </Link>
            <Link href={"/Timeline"}> Timeline Musica</Link>
        </nav>
    )

}