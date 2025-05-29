import Navbar from "../components/Navbar.jsx";
import Carousel from "../components/CarouselWithContent.jsx";
import DesinationCard from "../components/DestinationCard.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <>
            <Navbar />
            <Carousel />
            <DesinationCard />
            <Footer />
        </>
    )

}

export default HomePage;