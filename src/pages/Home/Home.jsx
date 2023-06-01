import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1>Trending Movies</h1>
            <ul><li>
            <Link to='/movies/1'>Trending Movie 1</Link>
            </li></ul>
        </>
    )
}