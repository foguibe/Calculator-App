$(document).ready(function() {
    var numberBtns = $(".number");
    var symbolBtns = $(".symbol");
    var deleteBtn = $(".delete");
    var resetBtn = $(".reset");
    var resultBtn = $(".result");
    var lightMode = $(".white");
    var darkMode = $(".black");
    var screenText = $(".screen-text");
    var unaccepted = ['x', '/'];
    var accepted = ['x', '/', '+', '-'];
    var userInput = screenText.text();

    $(document).on("click", function(event) {
        screenText.css({"color": "black"});
        var elementClicked = $(event.target);

        if (elementClicked.is(resultBtn)) {
            var newInput = userInput.replace(/\s/g, "");

            if (newInput == "") {
                screenText.text("");
            } else if (newInput == "syntaxerror!") {
                screenText.css({
                    "color": "red",
                    "font-weight": "bold"  // You can adjust other styles as needed
                });
                screenText.text("Syntax Error!");
                userInput = "";
            } else {
                if (unaccepted.includes(newInput[0])) {
                    screenText.css({
                        "color": "red",
                        "font-weight": "bold"  // You can adjust other styles as needed
                    });
                    screenText.text("Syntax Error!");
                    userInput = "";
                } 
                
                else if (accepted.includes(newInput.slice(-1))) {
                    screenText.css({
                        "color": "red",
                        "font-weight": "bold"  // You can adjust other styles as needed
                    });
                    screenText.text("Syntax Error!");
                    userInput = "";
                } 
                
                else {
                    //do the calculator logic
                    // Replace 'x' with '*' for multiplication
                    newInput = newInput.replace(/x/g, '*');

                    // Handle unary operators
                    newInput = newInput.replace(/(\D)([+-])\s(\d+(\.\d+)?)$/g, '$2$3');
        
                    try {
                        var result = eval(newInput);
                        screenText.text(result);
                        userInput = result.toString();
                    } catch (error) {
                        screenText.css({
                            "color": "red",
                            "font-weight": "bold"
                        });
                        screenText.text("Syntax Error!");
                        userInput = "";
                    }
                }
            }
        }
        
        else if (elementClicked.is(resetBtn)) {
            screenText.text("");
            userInput = "";
        }
        
        else if (elementClicked.is(deleteBtn)) {
            if (userInput.length > 0) {
                if (userInput.slice(-1) == " ") {
                    var newString = userInput.slice(0, -3);
                    userInput = newString;
                    screenText.text(newString);
                }
                else {
                    var newString = userInput.slice(0, -1);
                    userInput = newString;
                    screenText.text(newString);
                }
            }
        } 
        
        else if (elementClicked.is(numberBtns)) {
            userInput += elementClicked.text();
            screenText.text(userInput);
        } 
        
        else if (elementClicked.is(symbolBtns)) {
            userInput += " " + elementClicked.text() + " ";
            screenText.text(userInput);
        }

        else if (elementClicked.is(lightMode)) {
            $("#light-mode").css({ "display": "none" });
            $("#dark-mode").css({ "display": "block" });
        }
        
        else if (elementClicked.is(darkMode)) {
            $("#light-mode").css({ "display": "block" });
            $("#dark-mode").css({ "display": "none" });
        }
    });
});