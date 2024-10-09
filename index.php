<?php
session_start();
include_once('inc/head.php');
?>

<!-- Loader -->
<span class="loader_wrapper">
    <img src="assets/img/site_logo.svg" alt="MyStampMaker Logo">
    <div class="loader"></div>
</span>

<main>
    <!-- Header -->
    <?php include 'inc/header.php'; ?>
    
    <!-- Stamp Maker Canva -->
    <?php include 'inc/work_area.php'; ?>
    
    <!-- Banners section -->
    <?php include 'inc/banner.php'; ?>

    <!-- Instructions and Suggestions Buttons -->
    <?php include 'inc/instructions.php'; ?>
    <?php include 'inc/suggestion.php'; ?>
    <?php include 'inc/signup_modal.php'; ?>
    <?php include 'inc/login_modal.php'; ?>

    <!-- Mobile Layers and Properties Sections -->
    <div class="mobile_btns">
        <div class="mobile mobile_layers">
            <div class="suggest scroll" id="layers_mobile"></div>
            <button type="button" onclick="toggle_section('#layers_mobile')" class="layers_btn" data-toggle="modal" data-target="#layers"></button>
        </div>
        <div class="mobile mobile_properties">
            <div class="suggest" id="properties_mobile"></div>
            <button type="button" onclick="toggle_section('#properties_mobile')" class="properties_btn" data-toggle="modal" data-target="#mobile_props"></button>
        </div>
    </div>
</main>
