
import product1 from './assets/1.png';
import product2 from './assets/2.png';
import product3 from './assets/3.png';
import product4 from './assets/4.jpg';
import product5 from './assets/5.jpg';


let Id = 1;
export const PRODUCTS=[
    {
        _id:Id++,
        productName:"Iphone",
        price:90,
        productImage: product1,
    },
    {
        _id:Id++,
        productName:"Macbook",
        price:100,
        productImage: product2,
    },
    {
        _id:Id++,
        productName:"Cannon Camera",
        price:900,
        productImage: product3,
    },
    {
        _id:Id++,
        productName:"Face products",
        price:500,
        productImage: product4,
    },
    {
        _id:Id++,
        productName:"Smart Watch",
        price:80,
        productImage: product5,
    },
]