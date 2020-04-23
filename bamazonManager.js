var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: " ",
    database: "bamazon_db",
    insecureAuth: true
  });



connection.connect(function(err) 
  {
    if (err) throw err;
    start();
  });

function start() 
  {
  inquirer
    .prompt
      ({
      name: "ViewOrBuy",
      type: "list",
      message: "What would you like to do?",
      choices: ["VIEW PRODUCTS","VIEW LOW INVENTORY","ADD TO INVENTORY","ADD NEW PRODUCT", "EXIT"]
      })
      .then(function(answer) 
        {
        if(answer.ViewOrBuy === "VIEW PRODUCTS")
            {
            viewItems();
            }
        else if(answer.ViewOrBuy === "VIEW LOW INVENTORY")
            {
            viewInv();
            }
        else if(answer.ViewOrBuy === "ADD TO INVENTORY")
            {
            addInv();
            }
        else if(answer.ViewOrBuy === "ADD NEW PRODUCT")
            {
            addItems();
            }
        else
            {
              connection.end();
            }
        });
  };

function viewInv() 
    {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", 
        function(err, results) 
                    {
                    if (err) throw err;
                    console.log("\n");
                    console.table(results);
                    console.log("\n");
                    start();
                    });    
    };

function addInv() 
    {
    connection.query("SELECT * FROM products", function(err, results) 
        {
          if (err) throw err;
          console.log("\n\n");
          inquirer
              .prompt([
                  {
                    name: "choice",
                    type: "list",
                    choices: function() 
                      {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) 
                        {
                        choiceArray.push(results[i].product_name);
                        }
                      return choiceArray;
                      },
                    message: "What would you like to stock?"
                  },
                  {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to stock?"
                  }
                      ])
              .then(function(answer) 
                {
                var chosenItem;
                for (var i = 0; i < results.length; i++) 
                    {
                      if (results[i].product_name === answer.choice) 
                          {
                          chosenItem = results[i];
                          }
                    };
                var quantity = chosenItem.stock_quantity;
                var sql = "UPDATE products SET ? WHERE ?"
                connection.query(sql,
                                    [
                                      {
                                        stock_quantity : quantity + parseInt(answer.quantity)
                                      },
                                      {
                                        item_id : chosenItem.item_id
                                      }
                                    ],
                                function(err,res) 
                                    {
                                      if (err) throw err;
                                      console.log("\nStock was added sucessfully!\n")  
                                      start();
                                    }
                                );
                }); 
        });
    };

function viewItems()
  {
    connection.query("SELECT * FROM products", 
      function(err, results) 
        {
        if (err) throw err;
        console.log("\n");
        console.table(results);
        console.log("\n");
        start();
        });
  }


function addItems()
  {
    console.log("\n\n");
    inquirer
      .prompt([
        
        { type: "input",
          name: "add_name",
          message: "Please enter the name of the product."},
        { type: "list",
          name: "add_department",
          message: "Pick a department it belong to.",
          choices: ["WEAPON","ARMOR","CONSUMABLE"]},
        { type: "input",
          name: "add_price",
          message: "Please enter the price of the product."},
        { type: "input",
          name: "add_quantity",
          message: "Please enter the quantity of the product."}])
            .then(function(add){
                var sql = "INSERT INTO products ";
                sql += "(product_name, department_name, price, stock_quantity) ";
                sql += "VALUES (?,?,?,?)"
                connection.query(sql,
                                    [
                                      add.add_name,
                                      add.add_department,
                                      parseInt(add.add_price),
                                      parseInt(add.add_quantity)
                                    ], function(err, results) 
                                      {
                                      if (err) throw err;
                                      console.log("\nItem was added sucessfully!\n")
                                      start();
                                      })
                                  });
  };

