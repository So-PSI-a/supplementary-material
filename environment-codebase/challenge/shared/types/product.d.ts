interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    frames: ProductFrame[];
}

interface ProductFrame {
    id: number;
    name: string;
}
