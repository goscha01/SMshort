<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!empty($_POST['id'])) {
    $_SESSION['id']       = $_POST['id'];
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['email']    = $_POST['email'];
    $_SESSION['role']     = $_POST['role'];
    $_SESSION['isLogin']  = $_POST['isLogin'];
    $_SESSION['uid']      = $_POST['id'];
}

$base_url = "http://" . $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI'] . '?') . '/';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>MyStampMaker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui">
    <meta name="theme-color" content="#00438a">
    <meta name="title" content="MyStampMaker">
    <meta name="description" content="Create, Edit and Save Custom Stamp Designs Online for FREE!">
    <meta name="keywords" content="MyStampMaker, Stamp Designs, Online Stamp Designer">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">

    <link rel="icon" type="image/png" href="assets/img/favicon.png" sizes="32x32">
    <link rel="stylesheet" href="assets/css/overlayScrollbars.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">

    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/loader.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/canva.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/about.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171780865-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-171780865-1');
    </script>
    <script src="assets/js/jquery-3.5.1.js"></script>
    <script src="assets/js/jquery.overlayScrollbars.min.js"></script>
    <!-- <script src="assets/js/bootstrap.min.js"></script> -->
    <script src="http://hongru.github.io/proj/canvas2image/canvas2image.js"></script>
    <script src="assets/js/customCircularLibrary.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/modals.js"></script>
    <!-- <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> -->
    <script src="assets/js/select2.min.js"></script>
</head>

<body>
