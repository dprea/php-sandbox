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

foreach($routes as $route) {
    if($router == $route) {
        include_once($route . ".php");
    }
}

include_once("footer.php");