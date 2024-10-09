<!-- About Section -->
<div class="about_section header_side left">
    <button type="button" onclick='toggle_ins("#about_div")' class="button about_btn" data-toggle="modal" data-target="#aboutus">About</button>
    <div class='suggest' id='about_div'>
        <h6>About MyStampMaker</h6>
        <?php
        if (isset($_SESSION["uid"])) {
            $username = $_SESSION["uid"]['username'];
            echo "<div><div>Hi, $username</div><div>Welcome to MyStampMaker, an online tool that helps you create Custom Stamp Designs for FREE!</div></div>";
        } else {
            echo "<div><div>Welcome to MyStampMaker, an online tool that helps you create Custom Stamp Designs for FREE!</div><div><a data-toggle='modal' data-target='#myModal' class='about_cta'>Sign Up</a> Now to Get Started!</div></div>";
        }
        ?>
    </div>
</div>
