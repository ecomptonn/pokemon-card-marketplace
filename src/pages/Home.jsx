import Auth from "../components/Auth";

function Home() {
    return (
        <div>
            <h1>Pokemon Card Marketplace</h1>
            <p>
                Welcome to the best place to buy, sell, and trade Pokemon cards!
            </p>

            <Auth />
        </div>
    );
}

export default Home;
