export default function Opcion({ tipo, view }) {
	const input = document.querySelector('#input');

	return (
		<span
			onClick={() => {
				input.value = tipo;
				view(false);
			}}>
			{tipo}
		</span>
	);
}
