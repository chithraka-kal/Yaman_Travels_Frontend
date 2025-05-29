import Navbar from "../components/Navbar.jsx";
import Carousel from "../components/CarouselWithContent.jsx";
import DesinationCard from "../components/DestinationCard.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
            <Navbar />
            <Carousel />
            <DesinationCard />
            <Footer />
            </div>
        </>
    )

}

export default HomePage;