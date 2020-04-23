var mysql = require("mysql");
var inquirer = require("inquirer");
var boxen = require("boxen");

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



connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "ViewOrBuy",
      type: "list",
      message: "Would you like to [VIEW] or [BUY]?",
      choices: ["VIEW","BUY", "EXIT"]
    })
    .then(function(answer) {
     if(answer.ViewOrBuy === "BUY") {
        buyItems();
      }else if(answer.ViewOrBuy === "VIEW"){
        viewItems();
      } 
      else{
        connection.end();
      }
    });
}

function buyItems() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log("\n\n");
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy?"
        },
        {
          name: "buy",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }


        if (chosenItem.stock_quantity >= parseInt(answer.buy)) {

          var quantity = chosenItem.stock_quantity 
          connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity : quantity - parseInt(answer.buy)
              },
              {
                item_id : chosenItem.item_id
              }
            ],
            function(err,res) {
              if (err) throw err;
              var line = "\n"
              console.log(boxen(
                                "Product purchased successfully!"+ line +
                                "Purchase Summary"+ line +
                                "Item Name: " +  chosenItem.product_name + line +
                                "Item Count: " + parseInt(answer.buy) + line +
                                "Total: " + "$" + (chosenItem.price * parseInt(answer.buy)),
                                {padding: 1,borderColor: "green",backgroundColor: "blue" ,float: "center",margin: 1, borderStyle: 'double'}));
              start();
            }
          );
          
        }
        else {
          console.log("Insufficient quantity! Try again...");
          start();
        }
      });
  });
}

function viewItems()
  {
    connection.query("SELECT * FROM products", function(err, results) 
    {
      if (err) throw err;
      console.log("\n\n");
      console.log(boxen("~~~~~~~~~~~~~~~ Goods for Sale! ~~~~~~~~~~~~~~~", {float: "center", borderColor: "green"}));
      console.table(results);
      start();
    });
    
  }
  
    
