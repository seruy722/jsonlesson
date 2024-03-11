<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let searchData = '';
	let openDialog = false;
	let isOpenCartSideBar = false;
	let countProductInCart = 0;
	// Продукти корзини
	let productsInCart = [];
	// Сумма всіх товарів
	let productsCartSumm = 0;

	const countSum = () => {
		productsCartSumm = 0;
		let sum = 0;
		productsInCart.forEach((product) => {
			sum += product.sum * product.count;
		});
		productsCartSumm = sum;
	};

	const addProductToCart = (productData) => {
		const isProductInCart = productsInCart.find((product) => product.id === productData.id);
		console.log('isProductInCart', isProductInCart);

		if (isProductInCart === undefined) {
			productsInCart.push(productData);
			console.log('productsInCart', productsInCart);
			countProductInCart = countProductInCart + 1;
			productsInCart = productsInCart;
		}
	};

	const searchFunc = () => {
		console.log('searchFiled', searchData);
		fetch(`https://dummyjson.com/products/search?q=${searchData}`)
			.then((res) => res.json())
			.then((resData) => {
				data.products = resData.products;
			});
	};

	let productDataFormDialog = {};

	const getProductData = (product) => {
		console.log('product_25', product);
		productDataFormDialog = product;
		openDialog = true;
	};
</script>

<dialog class="modal" class:modal-open={openDialog}>
	<div class="modal-box">
		<form method="dialog">
			<button
				class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				on:click={() => (openDialog = false)}>✕</button
			>
		</form>
		<div class="card card-compact bg-base-100 shadow-xl">
			<figure>
				<img src={productDataFormDialog.thumbnail} alt="Shoes" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{productDataFormDialog.title}</h2>
				<p>{productDataFormDialog.description}</p>
				<p>Remains: {productDataFormDialog.stock}</p>
				<div class="card-actions justify-between">
					<div>
						{productDataFormDialog.price -
							(productDataFormDialog.price / 100) * productDataFormDialog.discountPercentage} $
					</div>
					<button class="btn btn-primary" on:click={addProductToCart(productDataFormDialog)}
						>Buy Now</button
					>
				</div>
			</div>
		</div>
	</div>
</dialog>

<h1>List from dummyjson</h1>

<p>
	Description list from <a href="https://dummyjson.com/docs/products"
		>https://dummyjson.com/docs/products</a
	>
</p>

<div class="flex justify-between p-10">
	<!-- Пошук -->
	<div class="join">
		<input
			class="input input-bordered join-item"
			name="search"
			bind:value={searchData}
			placeholder="Search"
		/>
		<button class="btn join-item rounded-r-full" on:click={searchFunc}>Search</button>
	</div>
	<!-- Корзина -->
	<div class="indicator">
		<span class="indicator-item badge badge-secondary">{countProductInCart}</span>
		<button
			class="btn"
			on:click={() => {
				isOpenCartSideBar = !isOpenCartSideBar;
				if (isOpenCartSideBar) {
					countSum();
				}
			}}
		>
			<svg class="h-6 w-6" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</div>

<div class="drawer drawer-end" class:drawer-open={isOpenCartSideBar}>
	<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<th>Title</th>
						<th>Description</th>
						<th>Rating</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each data.products as product, index}
						<tr>
							<th>
								<label>
									<input type="checkbox" class="checkbox" />
								</label>
							</th>
							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask mask-squircle w-12 h-12">
											<img src={product.thumbnail} alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div>
										<div class="font-bold">{product.title}</div>
										<div class="text-sm opacity-50 text-red-500 line-through">
											{product.price} $
										</div>
										<div class="text-sm opacity-50">
											{product.price - (product.price / 100) * product.discountPercentage} $
										</div>
									</div>
								</div>
							</td>
							<td>
								{product.description}
								<br />
								<span class="badge badge-ghost badge-sm">{product.brand}</span>
							</td>
							<td>
								<div class="rating">
									<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
									<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
									<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
									<input
										type="radio"
										name="rating-{index}"
										class="mask mask-star-2 bg-green-500"
										checked
									/>
									<input type="radio" name="rating-{index}" class="mask mask-star-2 bg-green-500" />
								</div>
							</td>
							<th>
								<button class="btn btn-ghost btn-xs" on:click={getProductData(product)}
									>details</button
								>
							</th>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<div class="drawer-side z-10">
		<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-150 min-h-full bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			{#if productsInCart.length}
				{#each productsInCart as product}
					<div class="flex items-center gap-3">
						<div class="avatar">
							<div class="mask mask-squircle w-12 h-12">
								<img src={product.thumbnail} alt="Avatar Tailwind CSS Component" />
							</div>
						</div>
						<div>
							<div class="font-bold">{product.title}</div>
							<div class="text-sm opacity-50 text-red-500 line-through">
								{product.price} $
							</div>
							<div class="text-sm opacity-50">
								{product.price - (product.price / 100) * product.discountPercentage} $
							</div>
						</div>
						<!-- Лічильник продукта в корзині -->
						<div class="join">
							<button
								class="btn join-item"
								on:click={() => {
									if (product.count > 1) {
										product.count = product.count - 1;
										countSum();
									}
								}}
							>
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
										fill="#000000"
									/>
								</svg>
							</button>
							<div>
								<div>
									<input
										type="number"
										readonly
										class="input input-bordered join-item w-20"
										value={product.count}
									/>
								</div>
							</div>
							<button
								class="btn join-item"
								on:click={() => {
									if (product.count !== product.stock) {
										product.count = product.count + 1;
										countSum();
									}
								}}
							>
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
										fill="#000000"
									/>
								</svg>
							</button>
							<button
								class="btn join-item"
								on:click={() => {
									const productIndex = productsInCart.findIndex((el) => product.id === el.id);
									product.count = 1;
									productsInCart.splice(productIndex, 1);
									productsInCart = productsInCart;
									countProductInCart -= 1;
									countSum();
								}}
							>
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.5"
										d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
										stroke="#1C274C"
										stroke-width="1.5"
									/>
									<path
										d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
										stroke="#1C274C"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				{/each}
				<div>Summ: {productsCartSumm}</div>
			{:else}
				<svg
					viewBox="0 0 20 20"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<title>cart_empty [#1163]</title>
					<desc>Created with Sketch.</desc>
					<defs> </defs>
					<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g
							id="Dribbble-Light-Preview"
							transform="translate(-300.000000, -2999.000000)"
							fill="#000000"
						>
							<g id="icons" transform="translate(56.000000, 160.000000)">
								<path
									d="M264,2839 L260,2839 L258,2839 L258,2851 L246,2851 L246,2853.184 C244.837,2853.597 244,2854.696 244,2856 C244,2857.657 245.343,2859 247,2859 C248.657,2859 250,2857.657 250,2856 C250,2854.696 249.163,2853.597 248,2853.184 L248,2853 L258,2853 L258,2853.184 C256.837,2853.597 256,2854.696 256,2856 C256,2857.657 257.343,2859 259,2859 C260.657,2859 262,2857.657 262,2856 C262,2854.696 261.163,2853.597 260,2853.184 L260,2841 L264,2841 L264,2839 Z M247,2854.951 L247.33,2855.068 C247.664,2855.187 248,2855.521 248,2856 C248,2856.551 247.551,2857 247,2857 C246.449,2857 246,2856.551 246,2856 C246,2855.521 246.336,2855.187 246.67,2855.068 L247,2854.951 L247,2854.951 Z M259,2854.951 C259.547,2855.145 260,2855.339 260,2856 C260,2856.551 259.551,2857 259,2857 C258.449,2857 258,2856.551 258,2856 C258,2855.339 258.453,2855.145 259,2854.951 L259,2854.951 Z"
									id="cart_empty-[#1163]"
								>
								</path>
							</g>
						</g>
					</g>
				</svg>
			{/if}
		</ul>
	</div>
</div>
