import { Text, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Offer_Image_1 from '../assets/Offer_1.png';
import Offer_Image_2 from '../assets/Offer_2.png';
import Offer_Image_3 from '../assets/Offer_3.png';
import Offer_Image_4 from '../assets/Offer_4.png';
import Offer_Image_5 from '../assets/Offer_5.png';

export const offer_images = [
    "../assets/Offer_1.png",
    "../assets/Offer_2.png",
    "../assets/Offer_3.png",
    "../assets/Offer_4.png",
    "../assets/Offer_5.png",
]

function loadAssets(): Record<string, string> {

    try {

        const offers = import.meta.glob(
            "/src/assets/offers/offer_*.{png,jpg,jpeg,webp}",
            {
                eager: true,
                import: "default",
            }
        ) as Record<string, string>;

        console.log(offers); // Log the offers object to see the imported images

        const images = Object.values(offers);

        console.log(images.length); // Number of offer images

        return offers;
    } catch (error) {
        console.error("Error loading offer images:", error);
        return {};
    }
}

export default function Offers() {
    return (
        <section className="py-10 flex flex-col gap-20 items-center justify-center border border-grey-300 rounded-2xl p-10">
            <div className="max-w-3xl space-y-3">
                <Text
                    size="sm"
                    fw={600}
                    tt="uppercase"
                    c="blue"
                    className="tracking-widest"
                >
                    What's new?
                </Text>

                <Title order={2} size="3rem" fw={700} lh={1.2}>
                    Find{" "}
                    <Text span inherit c="blue">
                        exclusive offers
                    </Text>{" "}
                    and the best deals available for you.
                </Title>
            </div>
            <div>
                <Carousel withIndicators
                    emblaOptions={{
                        loop: true
                    }}
                    className="max-w-6xl mx-auto rounded-2xl overflow-hidden"
                >
                    <Carousel.Slide>
                        <img src={Offer_Image_1} alt="Offer 1" className="w-full h-full object-cover rounded-lg" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img src={Offer_Image_2} alt="Offer 2" className="w-full h-full object-cover rounded-lg" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img src={Offer_Image_3} alt="Offer 3" className="w-full h-full object-cover rounded-lg" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img src={Offer_Image_4} alt="Offer 4" className="w-full h-full object-cover rounded-lg" />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img src={Offer_Image_5} alt="Offer 5" className="w-full h-full object-cover rounded-lg" />
                    </Carousel.Slide>
                </Carousel>
            </div>


        </section>
    );
}