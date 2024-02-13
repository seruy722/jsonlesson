/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const request = await fetch('https://dummyjson.com/products/50');
	const response = await request.json();
	console.log('response', response);
	return {
		products: response
	};
}
