import Header from "./elements/Header";
import HeroSection from "./elements/HeroSection";
import ProductGrid from "./elements/ProductGrid";

const Home = () => {
    return (
        <div className="font-sans">
            <Header />
            <HeroSection />
            <ProductGrid />
        </div>
    );
};

export default Home;
