export const DummyTasks = [
    {
        projectTitle: "Order page UI",
        dueDate: "Aug 25, 2024",
        priority: "high",
        status: "inProgress",
        description: "Design and implement the UI for the order page.",
        tags: ["Web", "UI"],
        progress: 77,
        contributors: [
            { name: "John Doe", role: "Developer", progress: 70 },
        ],
        subTasksCount: 6,
        comments: 3,
        detailedInfo: [
            { id: 1, title: "Design the order page", status: "Completed", date: "Aug 20, 2024", time: "1.5 hours" },
            { id: 2, title: "Implement the order page", status: "Pending", date: "Aug 23, 2024", time: "2 hours" },
            { id: 3, title: "Test the order page", status: "In Progress", date: "Aug 25, 2024", time: "0.5 hours" },
        ]
    },
    {
        projectTitle: "User Authentication Module",
        dueDate: "Sep 01, 2024",
        priority: "medium",
        status: "Pending",
        description: "Develop and integrate the user authentication module.",
        tags: ["Backend", "Security"],
        progress: 40,
        contributors: [
            { name: "Jane Smith", role: "Backend Developer", progress: 40 },
        ],
        subTasksCount: 4,
        comments: 5,
        detailedInfo: [
            { id: 1, title: "Design the authentication flow", status: "Completed", date: "Aug 22, 2024", time: "1 hour" },
            { id: 2, title: "Set up OAuth2", status: "Pending", date: "Aug 28, 2024", time: "1.5 hours" },
            { id: 3, title: "Implement JWT", status: "Pending", date: "Aug 30, 2024", time: "2 hours" },
            { id: 4, title: "Test the authentication module", status: "Pending", date: "Sep 01, 2024", time: "1 hour" },
        ]
    },
    {
        projectTitle: "Database Optimization",
        dueDate: "Sep 05, 2024",
        priority: "high",
        status: "inProgress",
        description: "Optimize the database for better performance and scalability.",
        tags: ["Database", "Performance"],
        progress: 60,
        contributors: [
            { name: "Michael Brown", role: "Database Administrator", progress: 60 },
        ],
        subTasksCount: 5,
        comments: 2,
        detailedInfo: [
            { id: 1, title: "Analyze current database performance", status: "Completed", date: "Aug 25, 2024", time: "2 hours" },
            { id: 2, title: "Identify bottlenecks", status: "Completed", date: "Aug 26, 2024", time: "1.5 hours" },
            { id: 3, title: "Implement indexing", status: "In Progress", date: "Aug 29, 2024", time: "2 hours" },
            { id: 4, title: "Optimize queries", status: "Pending", date: "Sep 01, 2024", time: "1.5 hours" },
            { id: 5, title: "Test the optimized database", status: "Pending", date: "Sep 05, 2024", time: "1 hour" },
        ]
    },
    {
        projectTitle: "Mobile App Integration",
        dueDate: "Sep 10, 2024",
        priority: "low",
        status: "Pending",
        description: "Integrate the mobile app with the backend services.",
        tags: ["Mobile", "Integration"],
        progress: 25,
        contributors: [
            { name: "Sarah Johnson", role: "Mobile Developer", progress: 25 },
        ],
        subTasksCount: 3,
        comments: 1,
        detailedInfo: [
            { id: 1, title: "Setup mobile project", status: "Completed", date: "Aug 15, 2024", time: "1 hour" },
            { id: 2, title: "Integrate API services", status: "Pending", date: "Sep 05, 2024", time: "3 hours" },
            { id: 3, title: "Test mobile app integration", status: "Pending", date: "Sep 10, 2024", time: "1 hour" },
        ]
    },
    {
        projectTitle: "Dashboard Analytics",
        dueDate: "Sep 15, 2024",
        priority: "medium",
        status: "inProgress",
        description: "Develop and implement the analytics dashboard.",
        tags: ["Frontend", "Analytics"],
        progress: 50,
        contributors: [
            { name: "Alice White", role: "Frontend Developer", progress: 50 },
        ],
        subTasksCount: 4,
        comments: 4,
        detailedInfo: [
            { id: 1, title: "Design dashboard UI", status: "Completed", date: "Aug 20, 2024", time: "1.5 hours" },
            { id: 2, title: "Implement data visualization", status: "In Progress", date: "Aug 28, 2024", time: "3 hours" },
            { id: 3, title: "Connect dashboard to API", status: "Pending", date: "Sep 08, 2024", time: "2 hours" },
            { id: 4, title: "Test dashboard functionality", status: "Pending", date: "Sep 15, 2024", time: "1.5 hours" },
        ]
    },
];

export const userTasksStat =
    { progressValue: 77, runningTask: 30, completedWork: "10/30", inProgressWork: "13/30" }
