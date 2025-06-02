import Carousel from "../components/CarouselWithContent.jsx";
import DesinationCard from "../components/DestinationCard.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <>
            <div className="flex flex-col min-h-screen">            
            <Carousel />
            <DesinationCard />
            <Footer />
            </div>
        </>
    )

}

export default HomePage;