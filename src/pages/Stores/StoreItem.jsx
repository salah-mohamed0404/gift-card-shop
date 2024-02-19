export default function StoreItem({ store }) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 py-5 shadow-md overflow-hidden">
			<a href={'#'} target="_blank" rel="noreferrer">
				<img
					src={store.logoImage}
					width={80}
					height={80}

					className=" h-48 w-48 object-fill rounded-full mx-auto p-1 "
					alt={`${store.logoName} logo`}
				/>
			</a>
			<div className="p-5 text-center">
				<a href={store.link} target="_blank" rel="noreferrer">
					<h3 className="text-2xl font-bold tracking-tight text-gray-900">{store.logoName}</h3>
				</a>
				<p className="mt-2 text-base text-gray-600">{store.brandDescription}</p>
			</div>
		</div>
	);
}
