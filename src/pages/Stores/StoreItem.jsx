export default function StoreItem({ store }) {
	return (
		<figure className="flex flex-col items-center gap-4">
			<a href={store.link} target="_blank" rel="noreferrer">
				<img
					src={store.logo}
					className="h-48 object-cover rounded-2xl shadow-lg"
					alt={`${store.name} logo`}
				/>
			</a>

			<figcaption className="text-center">
				<a href={store.link} target="_blank" rel="noreferrer">
					<h3 className="text-3xl font-medium">{store.name}</h3>
				</a>
				<p className="text-lg text-gray-500">{store.description}</p>
			</figcaption>
		</figure>
	);
}
