<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<button class="btn">Button</button>

<h1>List from dummyjson</h1>

<p>
	Description list from <a href="https://dummyjson.com/docs/products"
		>https://dummyjson.com/docs/products</a
	>
</p>
<div><img src={data.products.thumbnail} alt="thumbnailFromList" /></div>
<div>ID {data.products.id}</div>
<div>TITLE {data.products.title}</div>
<div>Description {data.products.description}</div>
<div>Price {data.products.price} $</div>

<div class="h-96 carousel carousel-vertical rounded-box">
	{#each data.products.images as imageSrc}
		<div class="carousel-item h-full">
			<img src={imageSrc} class="rounded-box" alt="" />
		</div>
	{/each}
</div>
