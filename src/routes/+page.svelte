<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let searchData = '';
	let openDialog = false;
	let isOpenCartSideBar = false;
	let countProductInCart = 0;
	let productsInCart = [];
	let productsCartSumm = 0;

	const addProductToCart = (productData) => {
		productsInCart.push(productData);
		console.log('productsInCart', productsInCart);
		countProductInCart = countProductInCart + 1;
		productsInCart = productsInCart;
		productsCartSumm =
			productsCartSumm +
			productData.price -
			(productData.price / 100) * productData.discountPercentage;
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
		<button class="btn" on:click={() => (isOpenCartSideBar = !isOpenCartSideBar)}>
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
		<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<!-- Sidebar content here -->
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
				</div>
			{/each}
			<div>Summ: {productsCartSumm}</div>
		</ul>
	</div>
</div>
