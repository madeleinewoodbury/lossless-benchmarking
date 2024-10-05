import BeatLoader from "react-spinners/RiseLoader"

const override = {
	display: "block",
}

const Spinner = ({ loadingData }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-12 py-12">
			<p className="text-white text-center text-lg">{loadingData}...</p>
			<BeatLoader
				color="#cbd5e1"
				loading={true}
				cssOverride={override}
				size={20}
			/>
		</div>
	)
}
export default Spinner
