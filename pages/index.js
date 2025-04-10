import Head from "next/head";
import Table from "../src/table";
import { Typography } from "@material-ui/core";
export default function Home() {
	const data = require("../data/data.json");
	return (
		<>
			<Head>
				<title className="mainHeading">Google Cloud Arcade Facilitator Program Leaderboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=0.1" />
			</Head>
			<div>
				<footer className="flex apart subhead">
					<Typography className="subhead bolder" variant="body2" color="textSecondary">
						Last updated: {data.buildDate}
					</Typography>
				</footer>
				<div className="center">
					<Typography className="bolder" variant="h3" color="textPrimary">
						GoogleCloudReady Facilitator Program Leaderboard
					</Typography>
					<Typography className="collegeName bolder" variant="h4" color="textSecondary">
						By Pratik and Vishwesh
					</Typography>
				</div>
				<div className="logo">
					<img src="https://cdn.worldvectorlogo.com/logos/google-cloud-2.svg" alt="google cloud logo" />
				</div>
				<Table data={data.resultsWithRank}></Table>
			</div>
			<div className="center footer">
				<Typography variant="body2" color="textSecondary">
					Made with ❤️ and ☕
				</Typography>
			</div>
		</>
	);
}
