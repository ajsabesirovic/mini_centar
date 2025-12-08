<?php
session_start();

$poslato = false;
$greska = "";

$usersFile = __DIR__ . '/users.json';
$users = [];

if (file_exists($usersFile)) {
    $json = file_get_contents($usersFile);
    $decoded = json_decode($json, true);
    if (is_array($decoded)) {
        $users = $decoded;
    }
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $poslato = true;
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (!$email || !$password) {
        $greska = "Email i lozinka su obavezni!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $greska = "Neispravan format email-a!";
    } elseif (!is_array($users) || !isset($users[$email])) {
        $greska = "Pogrešan email ili lozinka!";
    } elseif (!password_verify($password, $users[$email]['password_hash'])) {
        $greska = "Pogrešan email ili lozinka!";
    } else {

        $_SESSION['korisnik'] = $email;

        if (!empty($_POST['remember']) && $_POST['remember'] === "DA") {
            setcookie("email", $email, time() + 3600);
            setcookie("password", $password, time() + 3600);
        } else {
            setcookie("email", "", time() - 3600);
            setcookie("password", "", time() - 3600);
        }

        header("Location:index.html");
        exit();
    }
}
?>

<main>
<div class="container">
    <h1>Prijava</h1><br>

    <?php 
    if (isset($_COOKIE["email"]) && isset($_COOKIE["password"]))
        echo "<p style='color:green'>Kolačići su postavljeni</p>";
    else
        echo "<p style='color:red'>Kolačići nisu postavljeni</p>";
    ?>

    <?php if ($poslato && $greska) echo "<p style='color:red'><b>$greska</b></p>"; ?>

    <form action="login.php" method="POST" onsubmit="return provera()">
        <label>Email</label>
        <input type="email" name="email" 
               value="<?php if(isset($_COOKIE['email'])) echo $_COOKIE['email']; ?>" 
               id="email" autofocus>

        <label>Lozinka</label>
        <input type="password" name="password"
               value="<?php if(isset($_COOKIE['password'])) echo $_COOKIE['password']; ?>" 
               id="password">

        <label>Zapamti me</label>
        <select name="remember" id="zapamti">
            <option value="NE">NE</option>
            <option value="DA" selected>DA</option>
        </select>

        <br><br>
        <button type="submit">Prijavi se</button>
    </form>

    <br>Nemate nalog? <a href="register.html">Registrujte se</a><br>
</div>
</main>

<script>
function provera() {
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    if (email.length == 0) {
        alert("Nije unet email!");
        return false;
    }

    if (password.length == 0) {
        alert("Nije uneta lozinka!");
        return false;
    }

    return true;
}
</script>