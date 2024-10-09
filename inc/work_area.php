<!-- StampMaker Interface -->
<div class="work_area">
    <!-- Desktop Layers Section -->
    <div class="layers_tab side_card scroll">
        <h5>Layers</h5>
        <div id="labels">
            <!-- Layer labels will be dynamically inserted here -->
        </div>
    </div>
    <!-- Canvas and Toolbar -->
    <div class="canvas_tab" style="border:none;">
        <div class="toolbar">
            <div class="tool" id="addroundtext">
                <img class="iconimg" src="assets/img/icons/text_round.svg" alt="Add Round Text to Stamp" />
                <div style="max-width: 5ch;">Round Text</div>
            </div>
            <div class="tool" id="addlinetext">
                <img class="iconimg" src="assets/img/icons/text_line.svg" alt="Add Inline Text to Stamp" />
                <div style="max-width: 5ch;">Inline Text</div>
            </div>
            <div class="tool" id="addcircle">
                <img class="iconimg" src="assets/img/icons/shape.svg" alt="Add Shape Text to Stamp">
                <div style="max-width: 5ch;">Add Shape</div>
            </div>
            <div class="tool" id="addimage">
                <img class="iconimg" src="assets/img/icons/image.svg" alt="Add Image Text to Stamp">
                <div style="max-width: 5ch;">Add Image</div>
            </div>
        </div>
        <div class="canvas text-center">
            <!-- Canvas content will be dynamically inserted here -->
        </div>
        <?php
        $session = isset($_SESSION['uid']) ? $_SESSION['sessionid'] : 'null';
        ?>
        <button class="button" id="downloads" onclick="down('<?php echo $session ?>')">Download</button>
    </div>
    <!-- Properties Section -->
    <div id="properties_container" class="side_card">
        <h5>Properties</h5>
        <div id="properties">
            <!-- Properties content will be dynamically inserted here -->
        </div>
    </div>
</div>
