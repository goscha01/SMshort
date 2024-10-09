<?php 
if (empty($_SESSION["uid"])) {
    echo "</div></main>";
} else {
    getSuggest();
}
function getSuggest()
{
    echo "<div class='suggestion_section'><div id='toggle' onclick='toggle_ins(\"#suggest\")'> Any Suggestions? </div><div class='suggest' id='suggest'><div><h5>Leave Suggestion</h5><div class='insclose' onclick='toggle_ins(\"#suggest\")'>Close <i class='fas fa-times' style='color: #ffffff;'></i> </div></div>                <form action='javascript:suggestion()' method='post'>                    <textarea type='text' class='signup form-control' id='suggestText' placeholder='Enter Suggestions here.' required></textarea><button class='modals button' id='downloads'>Send</button></form></div></div></div></main>";
}