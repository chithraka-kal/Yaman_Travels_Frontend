import Carousel from "../components/CarouselWithContent";
import SearchWidget from "../components/SearchWidget";
import ValueProps from "../components/ValueProps";
import CategorySection from "../components/CategorySection";
import Testimonials from "../components/Testimonials";
import DesinationCard from "../components/DestinationCard";
import Newsletter from "../components/Newsletter";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">            
            <Carousel />
            <SearchWidget />
            <CategorySection />
            <DesinationCard />
            <ValueProps />
                        
            <Testimonials />
            <Newsletter />
        </div>
    );
}