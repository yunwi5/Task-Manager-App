export function getSubCategory (category: Category): SubCategory[] {
	switch (category) {
		case Category.HOME:
			return HomeCategoryList;
		case Category.LEISURE:
			return LeisureCategoryList;
		case Category.SCHOOL_UNIVERSITY:
			return SchoolCategoryList;
		case Category.WORK:
			return WorkCategoryList;
		case Category.PERSONAL:
			return PersonalCategoryList;
		default:
			return [];
	}
}
// Can be fixed afterwards
export enum Category {
	HOME = "Home",
	LEISURE = "Leisure",
	PERSONAL = "Personal",
	WORK = "Work",
	SCHOOL_UNIVERSITY = "School / University"
}

export const CategoryList = [
	Category.HOME,
	Category.LEISURE,
	Category.PERSONAL,
	Category.WORK,
	Category.SCHOOL_UNIVERSITY
];

export enum HomeCategory {
	SHOPPING = "Shopping",
	COOKING = "Cooking",
	LAUNDRAY = "Laundray",
	CLEANING = "Cleaning",
	FAMILY = "family"
}

export const HomeCategoryList = [
	HomeCategory.SHOPPING,
	HomeCategory.COOKING,
	HomeCategory.LAUNDRAY,
	HomeCategory.CLEANING,
	HomeCategory.FAMILY
];

export enum PersonalCategory {
	MUSIC = "Music",
	PROJECT = "Project",
	EXCERCISE = "Exercise",
	THERAPY = "Therapy",
	SELF_LEARNING = "Self Learning"
}

export const PersonalCategoryList = [
	PersonalCategory.EXCERCISE,
	PersonalCategory.MUSIC,
	PersonalCategory.PROJECT,
	PersonalCategory.SELF_LEARNING,
	PersonalCategory.THERAPY
];

export enum LeisureCategory {
	MOVIES = "Movies",
	FRIENDS = "Friends",
	GAMES = "Games",
	SPORTS = "Sports",
	TRIPS = "Trips",
	SOCIAL_MEDIA = "Social Media"
}

export const LeisureCategoryList = [
	LeisureCategory.MOVIES,
	LeisureCategory.FRIENDS,
	LeisureCategory.GAMES,
	LeisureCategory.SPORTS,
	LeisureCategory.TRIPS,
	LeisureCategory.SOCIAL_MEDIA
];

export enum WorkCategory {
	MEETING = "Meeting",
	REPORT = "Report",
	DAILY_WORK = "Daily Work"
}

export const WorkCategoryList = [
	WorkCategory.MEETING,
	WorkCategory.REPORT,
	WorkCategory.DAILY_WORK
];

export enum SchoolCategory {
	HOMEWORK = "HomeWork",
	ASSIGNMENTS = "Assignments",
	TEST_EXAMS = "Tests / Exams",
	LECTURES = "Lectures",
	REPORT = "Report / Essay",
	TUTORIALS = "Tutorials",
	LAB = "Lab",
	REPRESENTATIVES = "Representatives"
}

export const SchoolCategoryList = [
	SchoolCategory.HOMEWORK,
	SchoolCategory.ASSIGNMENTS,
	SchoolCategory.TEST_EXAMS,
	SchoolCategory.LECTURES,
	SchoolCategory.REPORT,
	SchoolCategory.TUTORIALS,
	SchoolCategory.LAB,
	SchoolCategory.REPRESENTATIVES
];

export type SubCategory =
	| HomeCategory
	| LeisureCategory
	| WorkCategory
	| SchoolCategory
	| PersonalCategory;
