
<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
//use Tuupola\Middleware\HttpBasicAuthentication;
use Tuupola\Middleware\JwtAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
//require_once __DIR__. '/bootstrap.php';

$app = AppFactory::create();

function  addHeaders (Response $response, array $headersOrigin) : Response {
    $origin = 'herokuapp';

    if (count ($headerOrigin) > 0) {
        $origin = $headerOrigin[0];
    }

    //->withHeader('Access-Control-Allow-Origin', (str_contains($origin, 'localhost') ? 'http://localhost:4200/' : 'https://tp05-burckert-lea.herokuapp.com/'))
    //->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Origin", ("*"))
    ->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization")
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}

function createJwt (Response $response) : Response {
    $userid = "lburckert";
    $email = "lburckert0@gmail.com";
    $issuedAt = time();
    $expirationTime = $issuedAt + 60;
    $payload = array(
        'userid' => $userid,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

    return $response;
}

const JWT_SECRET = "TP-CNAM-aetveu5567ppl83cww208";

$app->options('/api/register/{username}', function (Request $request, Response $response, $args) {
    $response = $response->withHeader("Access-Control-Max-Age", 600);

    return addHeaders($response, $request->getHeader('Origin'));
    //return addHeaders ($response);
});

$app->get('/api/register/{username}', function (Request $request, Response $response, $args) {
    global $entityManager;

    $username = $args['username'];

    console.log ("LOG : username 2 : " + $username );

    if ($username) {

        $data = array('username' => $username);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response);
        $response->getBody()->write(json_encode($data));
    }else {
        $response = $response->withStatus(401);
    }
    return $response;
});

$app->post('/api/username', function (Request $request, Response $response, $args) {
    global $entityManager;
    $err = false;
    $body = $request->getParsedBody();
    $username = $body ['username'] ?? "";
    $password = $body ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $username)) {
        $err = true;
    }

    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $password)) {
        $err = true;
    }

    if (!$err) {
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response);
        $data = array('username' => $username);
        $response->getBody()->write(json_encode($data));
    }else {
        $response = $response->withStatus(401);
    }

    return $response;
});


$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/username", "/api/register"],
    "error" => function ($response, $arguments) {
      $data["status"] = "error";
      $data["message"] = $arguments["message"];
      return $response
        ->withHeader("Content-Type", "application/json")
        ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        // $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT invalide');
        // $response = $response.withStatus(401);
        // return $response.withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
  ];

//$app->add(new JwtAuthentication($options));
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

// Run app
$app->run();

?>