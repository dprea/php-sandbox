<?php
/**
* Main Layout File.
* 
* 1. Include Header
* 2. Make Content Section
* 3. Include Footer
*/

$router; 
$routes = ["home", "about"];
    
if (isset($_SERVER['REQUEST_URI']))  {
    // Grabs the Relative Requested URI
    $router = $_SERVER['REQUEST_URI'];
    $router = substr($router, 1);
    if($router == "") {
        $router = "home";
    }
}

include_once("header.php");

if(in_array($router, $routes) == false) {
    include_once("404.php");
} else {
    for($x =0; $x<count($routes); $x++) {
        if($router == $routes[$x]) {
            include_once($router . ".php");
        }
    }
}

include_once("footer.php");