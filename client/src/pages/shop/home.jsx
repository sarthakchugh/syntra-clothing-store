import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/shopping_banner_1.jpeg';
import bannerTwo from '../../assets/shopping_banner_3.jpeg';
import bannerThree from '../../assets/shopping_banner_5.jpeg';
import bannerFour from '../../assets/shopping_banner_7.jpeg';

import { hm, zara, adidas, puma, levis, nike, women } from '../../assets/brand-icons';

import {
    BabyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FootprintsIcon,
    GlassesIcon,
    ShirtIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [bannerOne, bannerTwo, bannerThree, bannerFour];

function ShoppingHome() {
    const [bannerImage, setBannerImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setBannerImage((prevImage) => (prevImage + 1) % slides.length);
        }, 10000);

        return () => {
            clearInterval(timer);
        };
    });

    const categoriesWithIcon = [
        { id: 'men', label: 'Men', icon: ShirtIcon },
        { id: 'women', label: 'Women', icon: women },
        { id: 'kids', label: 'Kids', icon: BabyIcon },
        { id: 'accessories', label: 'Accessories', icon: GlassesIcon },
        { id: 'footwear', label: 'Footwear', icon: FootprintsIcon },
    ];

    const brandWithIcons = [
        { id: 'nike', label: 'Nike', icon: nike },
        { id: 'adidas', label: 'Adidas', icon: adidas },
        { id: 'puma', label: 'Puma', icon: puma },
        { id: 'levi', label: "Levi's", icon: levis },
        { id: 'zara', label: 'Zara', icon: zara },
        { id: 'h&m', label: 'H&M', icon: hm },
    ];

    function handleNavigateToProductPage(selection, section) {
        sessionStorage.removeItem('filters');
        const filters = {
            [section]: [selection.id],
        };
        sessionStorage.setItem('filters', JSON.stringify(filters));
        navigate('/shop/products');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[calc(100vh-64px)] xl:h-[65vh] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${
                            index === bannerImage ? 'opacity-100' : 'opacity-0'
                        } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />
                ))}
                {/* <Button
					variant='outline'
					size='icon'
					className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
					onClick={() => setBannerImage((prevImage) => (prevImage - 1 + slides.length) % slides.length)}
				>
					<ChevronLeftIcon className='w-4 h-4' />
				</Button>
				<Button
					variant='outline'
					size='icon'
					className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
					onClick={() => setBannerImage((prevImage) => (prevImage + 1) % slides.length)}
				>
					<ChevronRightIcon className='w-4 h-4' />
				</Button> */}
            </div>
            <section className="py-6 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {categoriesWithIcon.map((category, index) => (
                            <Card
                                key={index}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleNavigateToProductPage(category, 'category')}
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <category.icon className="w-12 h-12 mb-4 text-primary" />
                                    <span className="font-bold">{category.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-6 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6">Shop by Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {brandWithIcons.map((brand, index) => (
                            <Card
                                key={index}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleNavigateToProductPage(brand, 'brand')}
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brand.icon className="w-12 h-12 mb-4 text-primary" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingHome;
