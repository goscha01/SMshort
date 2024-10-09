<header class="header">
    <!-- About Sections -->
    <div class="about_section header_side left">
        <!-- Open Button -->
        <button type="button" onclick="toggle_ins('#about_div')" class="button about_btn" data-toggle="modal" data-target="#aboutus">About</button>
        <!-- Hidden Content -->
        <div class="suggest" id="about_div">
            <h6>About MyStampMaker</h6>
            <?php if (isset($_SESSION["uid"])): ?>
                <div>
                    <div>Hi, <?php echo $_SESSION["username"]; ?></div>
                    <div>Welcome to MyStampMaker, an online tool that helps you create Custom Stamp Designs for FREE!</div>
                </div>
            <?php else: ?>
                <div>
                    <div>Welcome to MyStampMaker, an online tool that helps you create Custom Stamp Designs for FREE!</div>
                    <div><a data-toggle="modal" data-target="#myModal" class="about_cta">Sign Up</a> Now to Get Started!</div>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <!-- Logo and Title -->
    <div class="branding">
        <img class="site_logo" src="assets/img/site_logo.svg" alt="MyStampMaker Official Logo" />
        <h1 class="site_title">My Stamp Maker</h1>
    </div>
    <!-- Login/Signup/Dashboard/Logout Buttons Logic -->
    <div class="nav_container header_side right">
            <button type="button" class="sign_up button">Sign Up</button>
            <button type="button" class="login_btn button" >Log In</button>
    </div>
</header>
