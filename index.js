const mysql = require("mysql");
const inquirer = require("inquirer");

function searchMenu() {
  inquirer
    .prompt({
      name: "searchMenu",
      type: "text",
      message: "Enter the ID you are searching for",
    })
    .then((res) => {
      findTodo(res.searchMenu).then((res) => {
        console.log(res);
        mainMenu();
      });
    });
}

function mainMenu() {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all", "View one", "Delete one", "Edit", "Exit"],
    })
    .then((res) => {
      console.log(res.mainMenu);
      switch (res.mainMenu) {
        case "View all":
          readAllTodos().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;

        case "View one":
          searchMenu();
          break;

        case "Exit":
          connection.end();
          process.exit();

        default:
          break;
      }
    });
}

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "NugPup28@",
  database: "todo_db",
});

connection.connect(async (err) => {
  if (err) throw err;
  console.log("We have been connected!");

  mainMenu();

  //   readAllTodos()
  //     .then((res) => {
  //       console.log(res);
  //       return findTodo(2);
  //     })
  //     .then((res) => {
  //       console.log("From find promise: ", res);
  //     });

  //   try {
  //     const result = await findTodo(2);
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
});

const readAllTodos = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const findTodo = (findId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM todos WHERE ?",
      [{ id: findId }],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const addTodo = (newText) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO todos SET ?", [{ text: newText }], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ msg: "Successfully added!" });
      }
    });
  });
};
