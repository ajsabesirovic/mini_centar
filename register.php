<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name         = trim($_POST['name'] ?? '');
$email        = trim($_POST['email'] ?? '');
$password     = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$techLanguage = $_POST['techLanguage'] ?? '';

if ($name === '' || $email === '' || $password === '' || $confirmPassword === '' || $techLanguage === '') {
    echo 'All fields are required.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Invalid email format.';
    exit;
}

if ($password !== $confirmPassword) {
    echo 'Passwords do not match.';
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$usersFile = __DIR__ . '/users.json';
$users = [];

if (file_exists($usersFile)) {
    $json = file_get_contents($usersFile);
    $decoded = json_decode($json, true);
    if (is_array($decoded)) {
        $users = $decoded;
    }
}

if (isset($users[$email])) {
    echo 'A user with this email already exists. Please log in instead.';
    exit;
}

$users[$email] = [
    'name'          => $name,
    'email'         => $email,
    'password_hash' => $passwordHash,
    'tech_language' => $techLanguage,
    'created_at'    => date('c'),
];

$writeResult = @file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

if ($writeResult === false) {
    http_response_code(500);
    echo 'Failed to save user data (users.json). Please check file/folder permissions in '
        . htmlspecialchars(dirname($usersFile));
    exit;
}

$_SESSION['user'] = [
    'name'       => $name,
    'email'      => $email,
    'techLanguage' => $techLanguage,
];

setcookie(
    'remembered_email',
    $email,
    [
        'expires'  => time() + 3600,
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]
);

header('Location: login.html');
exit;