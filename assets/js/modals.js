base_url = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';

function download() {
  var canvas = document.getElementsByTagName('canvas')[0];
  if (canvas.msToBlob) { //for IE
    var blob = canvas.msToBlob();
    window.navigator.msSaveBlob(blob, 'MyStampMaker-Stamp.png');
  } else {
    //other browsers
    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "MyStampMaker-Stamp.png";
    link.click();
  }
}

function toggle_section(e) {
  let myEle = document.querySelector(e);
  if (myEle.classList.contains("open")) {
    $(e).fadeOut();
    myEle.classList.remove("open")
  } else {
    $(e).fadeIn();
    myEle.classList.add("open")
  }
  document.querySelectorAll(".open").forEach(f => {
    if (`#${f.id}` == e) return;
    $(f).fadeOut();
    f.classList.remove("open");
  })

}
function toggle_ins(e) {
  $(e).slideToggle();
}
function suggestion() {
  var suggestText = $("#suggestText").val();
  var base_url_n = window.location.origin;
  if (suggestText == null || suggestText == "") {
    alert("Please enter message first");

  } else {
      swal("Thanks!", "Thanks for your suggestion, we will be notified.", "success").then((value) => {
      $("#suggest").slideToggle();
    });


    $.ajax({
      url: base_url_n + "/inc/suggestionmail.php", //the page containing php script
      type: "post", //request type,
      dataType: 'json',
      data: ({
        text: suggestText,
      }),
      success: function (response) {
        console.log(response);
      }
    }); 
  }

}