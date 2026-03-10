interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    delivery: OrderDelivery | null;
}

interface OrderItem {
    product: Omit<Product, 'frames'>;
    frame: ProductFrame;
    quantity: number;
}

interface OrderDelivery {
    date: string;
    service: string;
    to: string;
}
