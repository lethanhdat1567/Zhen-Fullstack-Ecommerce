import About from "./components/About/about";
import Features from "./components/Features/Features";
import News from "./components/News/News";
import Products from "./components/Products/Products";
import Service from "./components/Service/Service";
import Swiper from "./components/Swiper/swiper";

async function HomePage() {
    return (
        <div>
            <Swiper />
            <About />
            <Features />
            <Products />
            <Service />
            <News />
        </div>
    );
}

export default HomePage;
