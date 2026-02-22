const WEBRING_URL = "https://mac-csse-webring.vercel.app/";
const MY_SITE = "https://plagakit.github.io";

import mac from "../assets/mac.gif";
import arrow from "../assets/back_arrow.gif"

const Webring = () => {
	return <p
		style={{
			display: "inline-flex",
			alignItems: "center",
			gap: "0.5rem",
			fontSize: "1rem",
		}}
	>
		<a
			href={`${WEBRING_URL}#${MY_SITE}?nav=prev`}
			style={{ color: "inherit", textDecoration: "none" }}
			title="Previous site"
		>
			<img src={arrow} className="pixel"></img>
		</a>
		<a href={WEBRING_URL} style={{ lineHeight: 0 }} title="McMaster CS & SE Webring">
			<img
				src={mac}
				alt="McMaster CS & SE Webring"
                className="pixel"
				// style={{ height: 24, width: "auto", display: "block" }}
			/>
		</a>
		<a
			href={`${WEBRING_URL}#${MY_SITE}?nav=next`}
			style={{ color: "inherit", textDecoration: "none" }}
			title="Next site"
		>
			<img src={arrow} className="pixel rotate-180"></img>
		</a>
	</p>;
};

export default Webring;
