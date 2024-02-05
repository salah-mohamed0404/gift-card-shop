export default function StoreItem({ store }) {
	return (
		<div className="bg-white rounded-lg border border-gray-200 py-5 shadow-md overflow-hidden">
			<a href={store.link} target="_blank" rel="noreferrer">
				<img
					src={store.logo}
					className=" h-48 w-48 object-cover rounded-full mx-auto p-1 border-black border-2"
					alt={`${store.name} logo`}
				/>
			</a>
			<div className="p-5 text-center">
				<a href={store.link} target="_blank" rel="noreferrer">
					<h3 className="text-2xl font-bold tracking-tight text-gray-900">{store.name}</h3>
				</a>
				<p className="mt-2 text-base text-gray-600">{store.description}</p>
			</div>
		</div>
	);
}
