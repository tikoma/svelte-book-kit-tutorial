import { loadProducts } from '$lib/server/product';
import { addToCart, loadCart } from '$lib/server/cart.js';

export async function load({ params }){
    const productId = params.id;
    const products = await loadProducts();
    const product = products.find((product) => product.id === params.id);
    const relatedProducts = products.filter((/** @type {{ id: any; }} */ product) => product.id !== params.id);
    const cart = await loadCart();

    return { product, relatedProducts, cart };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        await addToCart( data.get( 'productId' ));
    }
};

async function getProductFromDatabase( productId ) {
    const products = await loadProducts();
    return products.find((product) => productId === product.id);
}

async function getRelatedProductsFromDatabase( productId ){
    const products = await loadProducts();
    return products.filter((product) => productId !== product.id );

}

// export async function load({ params }){
//     const productId = params.id;
//
//     const product = await getProductFromDatabase( productId );
//    const relatedProducts = await getRelatedProductsFromDatabase( productId );
// 
//     return { product, relatedProducts };
// }


