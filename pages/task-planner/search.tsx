// import type { NextPage } from 'next'
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

import TaskSearch from "../../components/task-search/TaskSearch";
import { getSearchedTasks } from "../../lib/planners/search-api";
import { PlannerTask, Task } from "../../models/task-models/Task";

interface Props {
	searchedTasks: Task[];
	searchWord: string;
}

const SearchPage: React.FC<Props> = (props) => {
	const { searchedTasks, searchWord } = props;
	const [ plannerTasks, setPlannerTasks ] = useState<PlannerTask[]>([]);

	useEffect(
		() => {
			const newPlannerTasks = searchedTasks.map((task) => new PlannerTask(task));
			setPlannerTasks(newPlannerTasks);
		},
		[ searchedTasks ]
	);

	return (
		<Fragment>
			<Head>
				<title>Searched Planner Tasks for {}</title>
				<meta name="description" content="User's search result for planner tasks" />
			</Head>
			<div>search</div>
			<TaskSearch searchedTasks={plannerTasks} searchWord={searchWord} />
		</Fragment>
	);
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res, query } = context;
	const session = getSession(req, res);
	if (!session || !session.user) {
		return {
			redirect: {
				destination: "/api/auth/login",
				permanent: false
			}
		};
	}

	const { q } = query;
	let searchWord = q || "";
	if (Array.isArray(searchWord)) {
		searchWord = searchWord.join("");
	}

	const searchedTasks: Task[] = await getSearchedTasks(searchWord, req.headers.cookie);

	return {
		props: {
			searchedTasks,
			searchWord
		}
	};
};
