document.addEventListener("DOMContentLoaded", function () {


    const addTaskBtn =
        document.getElementById("addTaskBtn");

    const taskInput =
        document.getElementById("taskInput");

    const dateInput =
        document.getElementById("dateInput");

    const priorityInput =
        document.getElementById("priorityInput");

    const taskList =
        document.getElementById("taskList");

    const exploreBtn =
        document.getElementById("exploreBtn");

    const dashboardBtn =
        document.getElementById("dashboardBtn");
    const totalTasks =
        document.getElementById("totalTasks");

    const completedTasks =
        document.getElementById("completedTasks");

    const pendingTasks =
        document.getElementById("pendingTasks");

    const filterButtons =
        document.querySelectorAll(".filter");

    const notificationBox =
        document.getElementById(
            "notificationBox"
    );
    const loginOpenBtn =
    document.getElementById(
        "loginOpenBtn"
    );

const loginModal =
    document.getElementById(
        "loginModal"
    );

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );
const themeToggleBtn =
    document.getElementById(
        "themeToggleBtn"
    );
const searchTask =
    document.getElementById(
        "searchTask"
    );
const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );
    let tasks =
        JSON.parse(localStorage.getItem("tracadTasks")) || [];



    tasks.forEach(task => {

        createTask(task);

    });



    updateStats();




    addTaskBtn.addEventListener("click", function () {


        const taskText = taskInput.value.trim();

        const dateValue = dateInput.value;

        const priorityValue = priorityInput.value;



        if (taskText === "") {

            alert("Please enter a task");

            return;

        }



        const taskObject = {

            text: taskText,

            date: dateValue,

            priority: priorityValue,

            completed: false

        };



        tasks.push(taskObject);



        localStorage.setItem(
            "tracadTasks",
            JSON.stringify(tasks)
        );



        createTask(taskObject);

        updateStats();

        
if (priorityValue === "High") {

    showNotification(
        "High Priority Task Added!"
    );

}


        taskInput.value = "";

        dateInput.value = "";

    });

    

    function showNotification(message) {

    notificationBox.innerText =
        message;

    notificationBox.classList.add(
        "showNotification"
    );

    setTimeout(function () {

        notificationBox.classList.remove(
            "showNotification"
        );

    }, 3000);

}


    function createTask(task) {


        const taskDiv =
            document.createElement("div");

        taskDiv.classList.add("task");



        if (task.completed) {

            taskDiv.classList.add("completed");

        }



        taskDiv.setAttribute(
            "data-priority",
            task.priority
        );




        const left =
            document.createElement("div");

        left.classList.add("task-left");



        const title =
            document.createElement("h3");

        title.innerText = task.text;



        const date =
            document.createElement("p");

        if (task.date) {

    const today =
        new Date();

    const dueDate =
        new Date(task.date);

    const timeDifference =
        dueDate - today;

    const daysLeft =
        Math.ceil(
            timeDifference /
            (1000 * 60 * 60 * 24)
        );

    if (daysLeft < 0) {

        date.innerText =
            "Overdue";

            showNotification(
    "Warning: Task Overdue!"
    );

    }

    else if (daysLeft === 0) {

        date.innerText =
            "Due Today";

    }

    else if (daysLeft === 1) {

        date.innerText =
            "1 Day Left";

    }

    else {

        date.innerText =
            daysLeft + " Days Left";

    }

}

else {

    date.innerText =
        "No Due Date";

}



        const priority =
            document.createElement("span");

        priority.classList.add(
            "priority-tag"
        );



        if (task.priority === "High") {

            priority.classList.add("high");

        }

        else if (task.priority === "Medium") {

            priority.classList.add("medium");

        }

        else {

            priority.classList.add("low");

        }



        priority.innerText =
            task.priority + " Priority";



        left.appendChild(title);

        left.appendChild(date);

        left.appendChild(priority);




        const buttonArea =
            document.createElement("div");

        buttonArea.classList.add(
            "task-buttons"
        );



        const completeBtn =
            document.createElement("button");

        completeBtn.innerText = "Done";

        completeBtn.classList.add(
            "complete-btn"
        );


        const editBtn =
        document.createElement("button");

        editBtn.innerText = "Edit";

        editBtn.classList.add(
            "edit-btn"
        );

        const deleteBtn =
            document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.classList.add(
            "delete-btn"
        );




        completeBtn.addEventListener(
            "click",
            function () {

                task.completed =
                    !task.completed;

                taskDiv.classList.toggle(
                    "completed"
                );

                saveTasks();

                updateStats();

            }
        );

            editBtn.addEventListener(
    "click",
    function () {

        const newTask =
            prompt(
                "Edit task",
                task.text
            );

        if (newTask !== null &&
            newTask.trim() !== "") {

            task.text = newTask;

            title.innerText = newTask;

            saveTasks();

        }

    }
);


        deleteBtn.addEventListener(
            "click",
            function () {

                taskDiv.remove();

                tasks = tasks.filter(t =>
                    t !== task
                );

                saveTasks();

                updateStats();

            }
        );

            buttonArea.appendChild(
    editBtn
);  

        buttonArea.appendChild(
            completeBtn
        );

        buttonArea.appendChild(
            deleteBtn
        );



        taskDiv.appendChild(left);

        taskDiv.appendChild(buttonArea);



        taskList.appendChild(taskDiv);

    }




    function saveTasks() {

        localStorage.setItem(
            "tracadTasks",
            JSON.stringify(tasks)
        );

    }




    function updateStats() {


        totalTasks.innerText =
            tasks.length;



        let completed =
            tasks.filter(task =>
                task.completed
            ).length;



        completedTasks.innerText =
            completed;



        pendingTasks.innerText =
            tasks.length - completed;

            const progressNumber =
    document.getElementById(
        "progressNumber"
    );

let percentage = 0;

if (tasks.length > 0) {

    percentage = Math.round(
        (completed / tasks.length)
        * 100
    );

}

progressNumber.innerText =
    percentage + "%";

    }




    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                document.querySelector(
                    ".active"
                ).classList.remove(
                    "active"
                );



                button.classList.add(
                    "active"
                );



                const filter =
                    button.dataset.filter;



                const allTasks =
                    document.querySelectorAll(
                        ".task"
                    );



                allTasks.forEach(task => {


                    if (filter === "all") {

                        task.style.display =
                            "flex";

                    }

                    else {

                        if (
                            task.dataset.priority
                            === filter
                        ) {

                            task.style.display =
                                "flex";

                        }

                        else {

                            task.style.display =
                                "none";

                        }

                    }

                });

            }
        );

    });




    exploreBtn.addEventListener(
        "click",
        function () {

            document.querySelector(
                "#features"
            ).scrollIntoView({

                behavior: "smooth"

            });

        }
    );

    dashboardBtn.addEventListener(
    "click",
    function () {

        document.querySelector(
            "#dashboard"
        ).scrollIntoView({

            behavior: "smooth"

        });

    }
);
loginOpenBtn.addEventListener(
    "click",
    function () {

        loginModal.style.display =
            "flex";

    }
);

loginBtn.addEventListener(
    "click",
    function () {

        const username =
            document.getElementById(
                "username"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        if (
            username === "" ||
            password === ""
        ) {

            loginMessage.innerText =
                "Please fill all fields";

            return;

        }

        localStorage.setItem(
            "tracadUser",
            username
        );

        loginMessage.innerText =
            "Welcome " + username;

            loginOpenBtn.innerText =
    username;

logoutBtn.style.display =
    "inline-block";

        setTimeout(function () {

            loginModal.style.display =
                "none";

        }, 1500);

    }
);
const calendarGrid =
    document.getElementById(
        "calendarGrid"
    );

const monthYear =
    document.getElementById(
        "monthYear"
    );

    let calendarMonth =
    new Date().getMonth();

let calendarYear =
    new Date().getFullYear();

function generateCalendar() {

    const currentDate =
        new Date();

    const currentMonth =
    calendarMonth;

const currentYear =
    calendarYear;

    const today =
        currentDate.getDate();

    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();

    const totalDays =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

    const months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    monthYear.innerText =
        months[currentMonth] +
        " " +
        currentYear;

    calendarGrid.innerHTML = "";

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.classList.add(
            "calendar-date",
            "empty-date"
        );

        calendarGrid.appendChild(
            empty
        );

    }

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dateBox =
            document.createElement("div");

        dateBox.classList.add(
            "calendar-date"
        );

        if (day === today) {

            dateBox.classList.add(
                "current-day"
            );

        }

        const dayNumber =
    document.createElement("div");

dayNumber.innerText = day;

dateBox.appendChild(
    dayNumber
);

const matchingTasks =
    tasks.filter(task => {

        if (!task.date)
            return false;

        const taskDate =
            new Date(task.date);

        return (

            taskDate.getDate() === day &&
            taskDate.getMonth() === currentMonth &&
            taskDate.getFullYear() === currentYear

        );

    });

matchingTasks.forEach(task => {

    const event =
        document.createElement("div");

    event.classList.add(
        "calendar-task"
    );

    if (task.priority === "High") {

        event.classList.add(
            "calendar-high"
        );

    }

    else if (
        task.priority === "Medium"
    ) {

        event.classList.add(
            "calendar-medium"
        );

    }

    else {

        event.classList.add(
            "calendar-low"
        );

    }

    event.innerText =
        task.text;

    dateBox.appendChild(
        event
    );

});

        calendarGrid.appendChild(
            dateBox
        );

    }

}

generateCalendar();

const prevMonth =
    document.getElementById(
        "prevMonth"
    );

const nextMonth =
    document.getElementById(
        "nextMonth"
    );

prevMonth.addEventListener(
    "click",
    function () {

        calendarMonth--;

        if (calendarMonth < 0) {

            calendarMonth = 11;

            calendarYear--;

        }

        generateCalendar();

    }
);

nextMonth.addEventListener(
    "click",
    function () {

        calendarMonth++;

        if (calendarMonth > 11) {

            calendarMonth = 0;

            calendarYear++;

        }

        generateCalendar();

    }
);
const savedUser =
    localStorage.getItem(
        "tracadUser"
    );

if (savedUser) {

    loginOpenBtn.innerText =
        savedUser;

    logoutBtn.style.display =
        "inline-block";

}
if (
    localStorage.getItem("theme")
    === "light"
) {

    document.body.classList.add(
        "light-theme"
    );

    themeToggleBtn.innerText =
        "🌙";

}

themeToggleBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light-theme"
        );

        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggleBtn.innerText =
                "🌙";

        }

        else {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggleBtn.innerText =
                "☀️";

        }

    }
);
searchTask.addEventListener(
    "input",
    function () {

        const searchValue =
            searchTask.value
            .toLowerCase();

        const allTasks =
            document.querySelectorAll(
                ".task"
            );

        allTasks.forEach(task => {

            const taskText =
                task.innerText
                .toLowerCase();

            if (
                taskText.includes(
                    searchValue
                )
            ) {

                task.style.display =
                    "flex";

            }

            else {

                task.style.display =
                    "none";

            }

        });

    }
);
logoutBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "tracadUser"
        );

        loginOpenBtn.innerText =
            "Login";

        logoutBtn.style.display =
            "none";

        showNotification(
            "Logged Out Successfully"
        );

    }
);
});
