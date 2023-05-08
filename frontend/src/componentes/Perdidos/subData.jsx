export default function SubData({ className, subtitle, data }) {
	return (
		<p className={className}>
			<b>{subtitle}:</b>
			<span> {data}</span>
		</p>
	);
}