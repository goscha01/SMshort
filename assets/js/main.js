// Declarations
var Inputdiameter,
  InputSpacing,
  InputText,
  InputStartAngle,
  InputColor,
  InputStrokeWidth,
  InputRadiusCircle,
  base64String = "",
  Circles = [],
  RoundTexts = [],
  LineTexts = [],
  Pictures = [],
  DeletedElements = [],
  ElementsForLabels = [],
  base64First = "";

function rangeSlider() {
  var slider = $(".slidecontainer"),
    range = $(".slider"),
    value = $(".range-slider__value");
  slider.each(function () {
    value.each(function () {
      var max = $(this).next().attr("max");
      var min = $(this).next().attr("min");
      var input = $(this).next().val();
      var percentage = ((input - min) * 100) / (max - min);
      $(this).html(parseInt(percentage, 10) + "%");
    });

    range.on("input", function () {
      //  debugger;
      var max = $(this).attr("max");
      var min = $(this).attr("min");
      var input = this.value;

      var percentage = ((input - min) * 100) / (max - min);
      $(this)
        .prev()
        .html(parseInt(percentage, 10) + "%");
    });
  });
}

function updateLabels(element, show) {
  let showVal = show.split(" ");
  let showText = showVal[0];
  let showNumber = showVal[1];
  $(".card-item").removeClass("all");
  $(".label").removeClass(
    "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
  );
  $(
    `
    <div class="elementlabel label" id="${element}">
        <p class="upper_text">${showText} ${showNumber}</p>
        <div>
            <button type='button' class='closeBtn delete_btn' aria-label='Close'>
                <i class='fas fa-times' style="color: #ff8800;"></i> 
            </button>
            <div class='up_down_arrow'> 
                <img class='move-up-element' src='assets/img/icons/arrow.svg' /> 
                <img class='move-down-element' src='assets/img/icons/arrow.svg' />
            </div>
        </div>
    </div>
    `
  )
    .prependTo("#labels")
    .addClass("animate__animated animate__fadeInLeft animate__faster");
  $(`#${element.replace(" #", "")}`).removeClass(
    "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
  );
  $(`#${element.replace(" #", "")}`).addClass(
    "animate__animated animate__fadeIn animate__faster"
  );
  $(".guide").css("display", "none");
  $(".upper_text").click(function (event) {
    $(".property").hide();
    let val = event.target.textContent
      .replace(/\s/g, "")
      .replace("Image", "Picture")
      .split("#");
    $(`#${val[0]}${val[1] - 1}`).fadeIn();
    $(`#${val[0]}${val[1] - 1}`).css("display", "grid");
    openProperties();
  });
}
function hideallproperties() {
  $("#properties .property").attr("style", "display:none");
}

function setResponsive() {
  $(".canvas_style").remove();
  let side =
      $(".canvas_tab").height() -
      ($(".canvas_tab #downloads").height() +
        $(".canvas_tab .toolbar").height()) - 50,
    styles = `.canvas, canvas {    width: calc(${side/parseFloat(getComputedStyle(document.documentElement).fontSize)}rem - 5vmin) !important;    height: calc(${side/parseFloat(getComputedStyle(document.documentElement).fontSize)}rem - 5vmin) !important; max-height: 100%; max-width: 100%;}  `;
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.setAttribute("class", "canvas_style");
  styleSheet.innerText = styles;
  if (side >= $(document).width() || side >= $(".canvas_tab").width()) {
    styleSheet.innerText = `.canvas, canvas {width: calc(${
      ($(".canvas_tab").width())/parseFloat(getComputedStyle(document.documentElement).fontSize)
    }rem - 5vmin) !important;height: calc(${($(".canvas_tab").width())/parseFloat(getComputedStyle(document.documentElement).fontSize)}rem - 5vmin) !important;max-height: 100%; max-width: 100%;}`;
  }
  document.head.appendChild(styleSheet);
}
function openProperties() {
  $("#properties_mobile").fadeIn();
  $("#properties_mobile").addClass("open");
}
$(document).ready(function () {
  console.log("MyStampMaker: Latest Version")
  window.addEventListener("orientationchange", function () {
    location.reload();
    setResponsive();
  });
  setInterval(() => {
    setResponsive()
  }, 100);
  $(window).resize(function () {
    setResponsive();
  });
  updateTheCanvas();
  setResponsive();
  if (
    $(window).width() < 700 ||
    $(window).height() > $(window).width() ||
    ($(window).height() < 500 && $(window).height() < $(window).width())
  ) {
    document.querySelector("#properties_mobile").innerHTML = `${
      document.querySelector("#properties_container").innerHTML
    }`;
    document.querySelector("#layers_mobile").innerHTML = `${
      document.querySelector(".layers_tab").querySelector(".os-content")
        .innerHTML
    }`;
  }
  $(".text").focus(function () {
    var height = $("body").css("height");
    $("body").css("height", height);
  });
  // Adding circle
  $("#addcircle").click(function () {
    hideallproperties();
    if (checkAvailiblity(Circles, 5) == 0) {
      return;
    }
    var moduleDiv = `<div id="Circle${Circles.length}" class="property">
    <h6>Circle: ${Circles.length + 1}</h6>
    <div class="shape_color color-element" style='width: 100%;'>
        <p class="color_picker_container">Color<input id="CircleColor-${
          Circles.length
        }"></p>
    </div>
    <div class="circle_inputs">
        <div class="slidecontainer">
            <span>Radius: </span>
            <span class="range-slider__value">0</span>
            <input type='range' id='InputRadiusCircle-${
              Circles.length
            }' class='slider' min='30' max='240' value='260'>
        </div>
        <div class="slidecontainer">
            <span>Stroke Width: </span>
            <span class="range-slider__value">0</span>
            <input type='range' id='InputStrokeWidthCircle-${
              Circles.length
            }' class='slider' min='1' max='100' value='1'>
        </div>
    </div>
</div>
`;

    $("#properties").append(moduleDiv);
    var Circle = [
      $("#InputRadiusCircle-" + Circles.length).val(),
      $("#InputStrokeWidthCircle-" + Circles.length).val(),
      null,
      null,
      null,
      null,
      null,
      null,
      "circle",
      null,
    ];
    openProperties();
    Circles.push(Circle);

    updateLabels(
      "Circle #" + (Circles.length - 1),
      "Circle #" + Circles.length
    );

    updateTheCanvas();
    updateColorPicker("CircleColor-" + (Circles.length - 1));
  });
  // Adding Round text
  $("#addroundtext").click(function () {
    hideallproperties();
    if (checkAvailiblity(RoundTexts, 7) == 0) {
      return;
    } // bold italic id in btn
    var moduleDiv =
      "<div id='RoundText" +
      RoundTexts.length +
      "' class='property round_text'>    <div>        <h6 class='text-center text-secondary font-style'>RoundText: " +
      (RoundTexts.length + 1) +
      "</h6>    </div>    <div class='input_block'> <select class='text_design_shadow font_input' id='InputFontRoundText-" +
      RoundTexts.length +
      "'>            <option value='Arial' style='font-family: Arial' selected>Arial</option>            <option value='Calibri' style='font-family: Calibri'>Calibri</option>            <option value='Courier New' style='font-family: Courier New'>Courier New</option>            <option value='Tahoma' style='font-family: Tahoma'>Tahoma</option>            <option value='Times New Roma' style='font-family: Times New Roma'>Times NewRoma</option>            <option value='Verdana' style='font-family: Verdana'>Verdana</option>            <option value='Comic Sans MS' style='font-family: Comic Sans MS'>Comic Sans MS</option>            <option value='Days' style='font-family: Days'>Days</option>            <option value='Simpleiriska' style='font-family: Simpleiriska'>Simpleiriska</option>            <option value='Marck Script' style='font-family: Marck Script'>Marck Script</option>        </select><select id='InputFontSizeRoundText-" +
      RoundTexts.length +
      "' class='text_design_shadow''>            <option>6</option>            <option>7</option>            <option>8</option>            <option>9</option>            <option>10</option>            <option>12</option>            <option>14</option>            <option>16</option>            <option selected>Size: 18</option>            <option>20</option>            <option>22</option>            <option>24</option>            <option>28</option>            <option>30</option>            <option>32</option>            <option>34</option>            <option>36</option>            <option>38</option>            <option>40</option>            <option>42</option>            <option>44</option>            <option>46</option>            <option>48</option>            <option>50</option>            <option>52</option>            <option>54</option>            <option>56</option>            <option>60</option>            <option>64</option>            <option>72</option>            <option>80</option>        </select>        <div class='text_design text_design_shadow bold_italic' style='border:1px solid #898989; padding: .1em .3em;'><button class='bg-light' style='border:none;font-family: serif;margin: 0;padding:0;' id='InputBoldRoundText-" +
      RoundTexts.length +
      "'>B</button> <button style='border: none;border-right: .1rem solid #000000; height: 1rem;'> </button><button class='bg-light' style='border:none;font-family:serif;' id='InputItalicRoundText-" +
      RoundTexts.length +
      "' type='button'>I</button></div>        <div class='text_design_color text_design_shadow color_picker_container'>Color<input id='RoundColor-" +
      RoundTexts.length +
      "' /></div>    </div>    <div> <input placeholder='Add some Text' type='text' id='InputTextRoundText-" +
      RoundTexts.length +
      "' class='text' value=''></div>        <div class='circle_inputs'>            <div class='slidecontainer'> <span>Radius:</span> <span class='range-slider__value'>0</span><input type='range' id='InputRadiusRoundText-" +
      RoundTexts.length +
      "' class='slider' min='30' max='406' value='150'> </div>            <div class='slidecontainer'> <span>Spacing:</span><span class='range-slider__value'>0</span><input type='range' id='InputSpacingRoundText-" +
      RoundTexts.length +
      "' class='slider' min='1.00' max='10.00' value='1'> </div>            <div class='slidecontainer'> <span>Start Point:</span> <span class='range-slider__value'>0</span><input type='range' id='InputStartingPointRoundText-" +
      RoundTexts.length +
      "' class='slider' min='0' max='360' value='0'> </div>                    </div></div>";

    $("#properties").append(moduleDiv);
    var textFieldVal = $("#InputTextRoundText-" + RoundTexts.length).val();

    if (textFieldVal === "") {
      textFieldValn = "Text around the circle";
    } else {
      textFieldValn = $("#InputTextRoundText-" + RoundTexts.length).val();
    }
    var RoundText = [
      $("#InputRadiusRoundText-" + RoundTexts.length).val(),
      $("#InputSpacingRoundText-" + RoundTexts.length).val(),
      $("#InputStartingPointRoundText-" + RoundTexts.length).val(),
      textFieldValn,
      $("#InputFontRoundText-" + RoundTexts.length).val(),
      $("#InputFontSizeRoundText-" + RoundTexts.length).val(),
      "normal",
      "normal",
      "Round Text",
      null,
    ];
    openProperties();

    RoundTexts.push(RoundText);

    updateLabels(
      "RoundText #" + (RoundTexts.length - 1),
      "RoundText #" + RoundTexts.length
    );
    updateTheCanvas();
    updateColorPicker("RoundColor-" + (RoundTexts.length - 1));
  });
  // Adding Line Text
  $("#addlinetext").click(function () {
    hideallproperties();
    if (checkAvailiblity(LineTexts, 10) == 0) {
      return;
    } // bold italic  modals
    var moduleDiv =
      "<div id='LineText" +
      LineTexts.length +
      "' class='property line_text'>    <div class=''>        <h6 class='text-center text-secondary font-style'>LineText: " +
      (LineTexts.length + 1) +
      "</h6>    </div>    <div class='input_block'> <select class='m-1 text_design_shadow font_input' id='InputFontLineText-" +
      LineTexts.length +
      "'>            <option value='Arial' style='font-family: Arial' selected=''>Arial</option>            <option value='Calibri' style='font-family: Calibri'>Calibri (body)</option>            <option value='Courier New' style='font-family: Courier New'>Courier New</option>            <option value='Tahoma' style='font-family: Tahoma'>Tahoma</option>            <option value='Times New Roma' style='font-family: Times New Roma'>Times New Roma</option>            <option value='Verdana' style='font-family: Verdana'>Verdana</option>            <option value='Comic Sans MS' style='font-family: Comic Sans MS'>Comic Sans MS</option>            <option value='Days' style='font-family: Days'>Days</option>            <option value='Simpleiriska' style='font-family: Simpleiriska'>Simpleiriska</option>            <option value='Marck Script' style='font-family: Marck Script'>Marck Script</option>        </select><select id='InputFontSizeLineText-" +
      LineTexts.length +
      "' class='m-1 text_design_shadow'>            <option>6</option>            <option>7</option>            <option>8</option>            <option>9</option>            <option>10</option>            <option>12</option>            <option>14</option>            <option>16</option>            <option selected=''>Size: 18</option>            <option>20</option>            <option>22</option>            <option>24</option>            <option>28</option>            <option>30</option>            <option>32</option>            <option>34</option>            <option>36</option>            <option>38</option>            <option>40</option>            <option>42</option>            <option>44</option>            <option>46</option>            <option>48</option>            <option>50</option>            <option>52</option>            <option>54</option>            <option>56</option>            <option>60</option>            <option>64</option>            <option>72</option>            <option>80</option>        </select>        <div class='text_design text_design_shadow bold_italic' style='border:1px solid #898989; padding: .1em .3em;'><button class='bg-light' style='font-family: serif;margin: 0;padding:0;border:none;' id='InputBoldLineText-" +
      LineTexts.length +
      "'>B</button> <button style='border: none;border-right: .1rem solid #000000; height: 1rem;'> </button> <button class='bg-light' style='border:none;font-family:serif;'  id='InputItalicLineText-" +
      LineTexts.length +
      "' type='button'>I</button></div>        <div class='text_design_color text_design_shadow color_picker_container'>Color<input id='LineColor-" +
      LineTexts.length +
      "'  /></div>    </div>    <div><input type='text' id='InputTextLineText-" +
      LineTexts.length +
      "' class='text' placeholder='Add some Text' value=''> </div>    <div class='circle_inputs'>        <div class='slidecontainer'><span> Position X: </span><span class='range-slider__value'>0</span> <input type='range' id='InputHorizontalPositionLineText-" +
      LineTexts.length +
      "' class='slider' min='0' max='250' value='125'> </div>        <div class='slidecontainer'><span> Position Y:</span><span class='range-slider__value'>0</span> <input type='range' id='InputVerticalPositionLineText-" +
      LineTexts.length +
      "' class='slider' min='0' max='240' value='120'> </div>        <div class='slidecontainer'><span> Rotation:</span><span class='range-slider__value'>0</span> <input type='range' id='InputRotationLineText-" +
      LineTexts.length +
      "' class='slider' min='0' max='360' value='0'></div>    </div></div></div>";
    $("#properties").append(moduleDiv);
    var textFieldVal = $("#InputTextLineText-" + LineTexts.length).val();

    if (textFieldVal === "") {
      textFieldValn = "Text on the line";
    } else {
      textFieldValn = $("#InputTextLineText-" + LineTexts.length).val();
    }
    var LineText = [
      textFieldValn,
      $("#InputHorizontalPositionLineText-" + LineTexts.length).val(),
      $("#InputVerticalPositionLineText-" + LineTexts.length).val(),
      $("#InputRotationLineText-" + LineTexts.length).val(),
      $("#InputFontLineText-" + LineTexts.length).val(),
      $("#InputFontSizeLineText-" + LineTexts.length).val(),
      "normal",
      "normal",
      "normal",
      "#ff8800",
    ];
    openProperties();

    LineTexts.push(LineText);

    updateLabels(
      "LineText #" + (LineTexts.length - 1),
      "LineText #" + LineTexts.length
    );
    updateTheCanvas();
    updateColorPicker("LineColor-" + (LineTexts.length - 1));
  });
  // Adding Pictures
  $("#addimage").click(function () {
    hideallproperties();
    // debugger;
    var undeleted = 0;
    for (var i = 0; i < Pictures.length; ++i) {
      // Runs when it is deleted
      if (typeof Pictures[i][6] === "undefined") {
        undeleted++;
      }
    }
    var ne = 1 - undeleted;
    if (ne == 0 || ne < 0) {
      return;
    }
    var moduleDiv =
      "<div id='Picture" +
      Pictures.length +
      "' class='property picture_properties'>            <h6>Image: " +
      (Pictures.length + 1) +
      "</h6>        <div class='file_input'>  <input type='file' id='InputPictureSrc-" +
      Pictures.length +
      "' name='files' /><label for='InputPictureSrc-" +
      Pictures.length +
      "'>Open File</label></div>        <div class='circle_inputs'>            <div class='slidecontainer'><span> Position X: </span><span class='range-slider__value'>0</span> <input type='range' id='InputPictureHorizontalPosition-" +
      Pictures.length +
      "' class='slider' min='1' max='250' value='126'> </div>            <div class='slidecontainer'><span> Position Y: </span><span class='range-slider__value'>0</span> <input type='range' id='InputPictureVerticalPosition-" +
      Pictures.length +
      "' class='slider' min='1' max='250' value='126'> </div>            <div class='slidecontainer'><span> Size: </span><span class='range-slider__value'>0</span> <input type='range' id='InputPictureSize-" +
      Pictures.length +
      "' class='slider' min='1' max='250' value='250'> </div>            <div class='slidecontainer'><span> Rotation: </span><span class='range-slider__value'>0</span> <input type='range' id='InputPictureRotation-" +
      Pictures.length +
      "' class='slider' min='0' max='360' value='0'> </div>        </div>    </div>";

    $("#properties").append(moduleDiv);
    var Picture = [
      $("#InputPictureSrc-" + Pictures.length).val() == null
        ? null
        : $("#InputPictureSrc-" + Pictures.length).val(),
      $("#InputPictureSize-" + Pictures.length).val(),
      $("#InputPictureHorizontalPosition-" + Pictures.length).val(),
      $("#InputPictureVerticalPosition-" + Pictures.length).val(),
      $("#InputPictureRotation-" + Pictures.length).val(),
      "Picture",
    ];
    openProperties();
    Pictures.push(Picture);

    updateLabels(
      "Picture #" + (Pictures.length - 1),
      "Image #" + Pictures.length
    );
    updateTheCanvas();
  });

  function updateColorPicker(ele) {
    $("#" + ele).spectrum({
      color: "#ff8800",
      move: function (color) {
        if (ele.indexOf("Circle") !== -1) {
          var indexofelement = ele.split("-").pop();
          Circles[indexofelement][10] = color.toHexString();
          updateTheCanvas();
        } else if (ele.indexOf("Round") !== -1) {
          var indexofelement = ele.split("-").pop();
          RoundTexts[indexofelement][10] = color.toHexString();
          updateTheCanvas();
        } else if (ele.indexOf("Line") !== -1) {
          var indexofelement = ele.split("-").pop();
          LineTexts[indexofelement][11] = color.toHexString();
          updateTheCanvas();
        }
      },
    });
  }

  function updateTheCanvas() {
    rangeSlider();
    var fore = $(".pickup").val();
    $(".canvas").append(
      getCircularText(
        fore,
        Circles,
        RoundTexts,
        LineTexts,
        Pictures,
        DeletedElements
      )
    );
  }
  $(document).on("click", ".closeBtn", function (e) {
    $(e.target.parentElement.parentElement).removeClass(
      "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
    );
    $(e.target.parentElement.parentElement)
      .addClass("animate__animated animate__shakeX animate__faster")
      .fadeOut();
    setTimeout(() => {
      elementd = $(this).parent().parent().next();
      elementp = $(this).parent().parent().prev();
      lastchild = $(".elementlabel:last-child");
      var orignalid = $(this).parent().parent().attr("id"); // delete element on canvas with id
      $(this).parent().parent().remove(); // deleted to remove
      var typeofelement = orignalid.split(" ")[0];
      var indexofelement = orignalid.split("#")[1];

      var deleteElement = [typeofelement, indexofelement];

      if (typeofelement == "Circle") {
        Circles[indexofelement].push("deleted");
      } else if (typeofelement == "LineText") {
        LineTexts[indexofelement].push("deleted");
      } else if (typeofelement == "RoundText") {
        RoundTexts[indexofelement].push("deleted");
      } else {
        Pictures[indexofelement].push("deleted");
        base64First = "";
      }

      updateTheCanvas();
      hideallproperties();
      // changed code
      var lastchildid = $(lastchild).attr("id");
      console.log(orignalid + "gg");
      console.log(lastchildid);

      if ($(this).parent().parent().attr("id") == lastchildid) {
        var newhh = $(elementp).attr("id");
        var elementtype = newhh.split("#")[0]; //  linetext
        var elementindex = newhh.split("#")[1]; //  0
        var propertywindowid = elementtype.trim() + elementindex; //  linetext0
        $("#" + propertywindowid).attr("style", "display:block"); // #linetext0
      } else {
        nextactiveelement = $(this).parent().parent().next();
        var newhh = $(elementd).attr("id");
        var elementtype = newhh.split("#")[0]; //  linetext
        var elementindex = newhh.split("#")[1]; //  0
        var propertywindowid = elementtype.trim() + elementindex; //  linetext0
        $("#" + propertywindowid).attr("style", "display:block"); // #linetext0
      }
    }, 200);
  });

  // new function
  $(document).on("click", ".card-item-n", function () {
    hideallproperties();
    var elementid = $(this).attr("id"); // wrong id

    var elementtype = elementid.split("#")[0];
    var elementindex = elementid.split("#")[1];
    var propertywindowid = elementtype.trim() + elementindex;
    $("#" + propertywindowid).attr("style", "display:block");
  });
  // new function for move down
  $(document).on("click", ".move-down-element", function () {
    nextelement = $(this).parent().parent().parent().next();
    currentelement = $(this).parent().parent().parent();
    if (
      this.parentElement.parentElement.parentElement !=
      document.querySelectorAll(".label")[
        document.querySelectorAll(".label").length - 1
      ]
    ) {
      currentelement.removeClass(
        "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
      );
      nextelement.removeClass(
        "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
      );
      currentelement.addClass(
        "animate__animated animate__fadeInDown animate__faster"
      );
      nextelement.addClass(
        "animate__animated animate__slideInUp animate__faster"
      );
    }
    $(nextelement).insertBefore(currentelement);
  });

  // new function for move up
  $(document).on("click", ".move-up-element", function () {
    prevelement = $(this).parent().parent().parent().prev();
    currentelement = $(this).parent().parent().parent();
    if (
      this.parentElement.parentElement.parentElement !=
      document.querySelectorAll(".label")[0]
    ) {
      prevelement.removeClass(
        "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
      );
      currentelement.removeClass(
        "animate__animated animate__fadeInDown animate__faster animate__slideInUp animate__fadeInLeft animate__fadeIn animate__shakeX"
      );
      prevelement.addClass(
        "animate__animated animate__fadeInDown animate__faster"
      );
      currentelement.addClass(
        "animate__animated animate__slideInUp animate__faster"
      );
    }
    $(prevelement).insertAfter(currentelement);
  });
  $(".pickup").change(function () {
    updateTheCanvas();
  });
  $(document).on(
    "change input click",
    "input[type=text],input[type=range],input[type=file], select, button:not(.close,.swal-button,.modals)",
    function () {
      var idofelement = $(this).attr("id");
      if (idofelement) {
        var valueofelement = $(this).val();
        var indexofelement = idofelement.split("-").pop();
        // Checking if the element is circle
        if (idofelement.indexOf("Circle") !== -1) {
          if (idofelement.split("-")[0] == "InputRadiusCircle") {
            Circles[indexofelement][0] = valueofelement;
            updateTheCanvas();
          } else if (idofelement.split("-")[0] == "InputStrokeWidthCircle") {
            Circles[indexofelement][1] = valueofelement;
            updateTheCanvas();
          }
        } else if (idofelement.indexOf("RoundText") !== -1) {
          var theElementInputId = idofelement.split("-")[0];
          if (theElementInputId == "InputTextRoundText") {
            RoundTexts[indexofelement][3] = valueofelement;
          } else if (theElementInputId == "InputRadiusRoundText") {
            RoundTexts[indexofelement][0] = valueofelement;
          } else if (theElementInputId == "InputSpacingRoundText") {
            RoundTexts[indexofelement][1] = valueofelement;
          } else if (theElementInputId == "InputFontRoundText") {
            RoundTexts[indexofelement][4] = valueofelement;
          } else if (theElementInputId == "InputFontSizeRoundText") {
            RoundTexts[indexofelement][5] = valueofelement;
          } else if (theElementInputId == "InputStartingPointRoundText") {
            RoundTexts[indexofelement][2] = valueofelement;
          } else if (theElementInputId == "InputBoldRoundText") {
            if (RoundTexts[indexofelement][6] == "normal") {
              RoundTexts[indexofelement][6] = "600";
            } else {
              RoundTexts[indexofelement][6] = "normal";
            }
          } else if (theElementInputId == "InputItalicRoundText") {
            if (RoundTexts[indexofelement][7] == "normal") {
              RoundTexts[indexofelement][7] = "italic";
            } else {
              RoundTexts[indexofelement][7] = "normal";
            }
          }
          updateTheCanvas();
        } else if (idofelement.indexOf("LineText") !== -1) {
          var theElementInputId = idofelement.split("-")[0];
          if (theElementInputId == "InputHorizontalPositionLineText") {
            LineTexts[indexofelement][1] = valueofelement;
          } else if (theElementInputId == "InputVerticalPositionLineText") {
            LineTexts[indexofelement][2] = valueofelement;
          } else if (theElementInputId == "InputTextLineText") {
            LineTexts[indexofelement][0] = valueofelement;
          } else if (theElementInputId == "InputRotationLineText") {
            LineTexts[indexofelement][3] = valueofelement;
          } else if (theElementInputId == "InputFontLineText") {
            LineTexts[indexofelement][4] = valueofelement;
          } else if (theElementInputId == "InputFontSizeLineText") {
            LineTexts[indexofelement][5] = valueofelement;
          } else if (theElementInputId == "InputBoldLineText") {
            if (LineTexts[indexofelement][6] == "normal") {
              LineTexts[indexofelement][6] = "600";
            } else {
              LineTexts[indexofelement][6] = "normal";
            }
          } else if (theElementInputId == "InputItalicLineText") {
            if (LineTexts[indexofelement][7] == "normal") {
              LineTexts[indexofelement][7] = "italic";
            } else {
              LineTexts[indexofelement][7] = "normal";
            }
          } else if (theElementInputId == "InputUnderlineLineText") {
            code;
            if (LineTexts[indexofelement][8] == "normal") {
              LineTexts[indexofelement][8] = "underline";
            } else {
              LineTexts[indexofelement][8] = "normal";
            }
          }

          updateTheCanvas();
        } else if (idofelement.indexOf("Picture") !== -1) {
          var theElementInputId = idofelement.split("-")[0];
          if (theElementInputId == "InputPictureHorizontalPosition") {
            Pictures[indexofelement][2] = valueofelement;
          } else if (theElementInputId == "InputPictureVerticalPosition") {
            Pictures[indexofelement][3] = valueofelement;
          } else if (theElementInputId == "InputPictureSize") {
            Pictures[indexofelement][1] = valueofelement;
          } else if (theElementInputId == "InputPictureRotation") {
            Pictures[indexofelement][4] = valueofelement;
          } else if (theElementInputId == "InputPictureSrc") {
          }
          updateTheCanvas();
        }
      }
    }
  );
});

$("input[type=range]").on("input", function () {
  $(this).trigger("change");
});
$(document).on("change", "input[type=file]", function () {
  if (this.files && this.files[0]) {
    var FR = new FileReader();
    var id = $(this).attr("id");
    var index = id.split("-").pop();

    FR.addEventListener("load", function (e) {
      base64First = e.target.result;
      for (var i = 0; i < Pictures.length; i++) {
        Pictures[i][0] = base64First;
        Pictures[i][2] = 125;
        Pictures[i][3] = 125;
        $("#InputPictureVerticalPosition-" + index).val(126);
        $("#InputPictureHorizontalPosition-" + index).val(126);
      }
      rangeSlider();
      var fore = $(".pickup").val();
      $(".canvas").append(
        getCircularText(
          fore,
          Circles,
          RoundTexts,
          LineTexts,
          Pictures,
          DeletedElements
        )
      );
    });

    FR.readAsDataURL(this.files[0]);
  }
});

function checkAvailiblity(ElementArray, max) {
  var undeleted = 0;
  for (var i = 0; i < ElementArray.length; ++i) {
    // Runs when it is deleted
    if (typeof ElementArray[i][9] === "undefined") {
      undeleted++;
    }
  }
  var ne = max - undeleted;
  if (ne == 0 || ne < 0) {
    return 0;
  }
  return 1;
}

function down() {
  download();
}

function incrementdownloadnumber(s) {
  $.ajax({
    url: "/inc/incrementdownloadnum.php", // the page containing php script
    type: "post", // request type,
    dataType: "json",
    data: {
      id: s,
    },
    success: function (response) {
      console.log(response.abc);
    },
  });
}
document.addEventListener("DOMContentLoaded", function () {
  OverlayScrollbars(document.querySelectorAll(".scroll"), {});
});

$(document).ready(function () {
  // Loader Fades out
  $(".loader_wrapper").delay(300).fadeOut("slow");
  // Interface Fades in
  $("main").hide().delay(800).fadeIn("slow");
  $(".suggest").hide();
});

function CheckValidation(customLang, id) {
  if (customLang == true) {
    $(id + "").attr("required", "true");
  } else {
    $(id + "").removeAttr("required");
  }
}