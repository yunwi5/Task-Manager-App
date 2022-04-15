import React from "react";

import { useAppSelector } from "../../../store/redux";
import { Template } from "../../../models/template-models/Template";
import { getShortNameWithRest } from "../../../utilities/gen-utils/string-util";
import NavList from "./NavList";
import classes from "../Layout.module.scss";

interface Props {
    onToggleSidebar: () => void;
    showSidebar: boolean;
}

const SideNav: React.FC<Props> = ({ showSidebar }) => {
    const templates = useAppSelector((state) => state.template.templates);
    const userTemplateItems = templates.map((tem: Template) => ({
        name: getShortNameWithRest(tem.name, 15),
        link: `/templates/${tem.id}`,
    }));

    const todoLists = useAppSelector((state) => state.todoList.lists);
    const userTodoLists = todoLists.map((list) => ({
        name: getShortNameWithRest(list.name, 15),
        link: `/todos/${list.id}`,
    }));

    const timePlannerItems = [
        {
            name: "Weekly Planners",
            link: "/task-planner/weekly-planner",
        },
        {
            name: "Montly Planners",
            link: "/task-planner/montly-planner",
        },
        {
            name: "Yearly Planners",
            link: "/task-planner/yearly-planner",
        },
    ];
    const templateItems = [
        ...userTemplateItems,
        {
            name: "+ Add New",
            link: "/templates/new",
        },
    ];
    const dataAnalysisItems = [
        {
            name: "Weekly Analysis",
            link: "/",
        },
        {
            name: "Montly Analysis",
            link: "/",
        },
        {
            name: "Yearly Analysis",
            link: "/",
        },
    ];

    // Need to fetch some existing custom lists for the user.
    const todoItems = [...userTodoLists, { name: "+ New List", link: "/todos/new" }];

    return (
        <nav
            className={`bg-slate-400 mw-[11rem] h-full p-2 flex flex-col items-start ${
                showSidebar ? "translate-x-0" : "-translate-x-full"
            } ease-in-out duration-[.5s] ${classes.sidenav}`}
        >
            <h3 className='text-[1.5rem] text-white mt-1'>Categories</h3>
            <NavList listName='Periodic Planners' items={timePlannerItems} />
            <NavList listName='Planner Templates' items={templateItems} />
            <NavList listName='Data Analysis' items={dataAnalysisItems} />
            <NavList listName='Custom Lists' items={todoItems} />
        </nav>
    );
};

export default SideNav;