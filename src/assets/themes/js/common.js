
$(document).ready(function() {
  bootbox.setDefaults('locale', 'zh_CN');
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: $(this).serialize(),
      beforeSend: function () {
        $(':submit').attr('disabled', 'disabled');
      },
      complete: function () {
        $(':submit').removeAttr('disabled');
      },
      success: function (result) {
        if (result.State == 'Error') {
          bootbox.alert({
            buttons: {
              ok: { label: '确定' }
            },
            message: result.Msg,
            callback: function () { },
            title: '提示'
          });
          $('[name=verifyCode]').val('');
          $('.imgcode').click();
        } else {
          window.location.href = result.ReturnUrl;
        }
      }
    });
  });
});
function bgimg() {
  var bg = $('#bgimg');
  var bgi = $('#bgimg img');
  landCenter('#bgimg img', 50);

  var winW = document.documentElement.clientWidth;
  var winH = document.documentElement.clientHeight;
  var scale = 0.5625;
}

function landCenter(a, t) {
  var land = $(a);
  var th = ($(window).height() - land.outerHeight()) / 2;
  var rw = ($(window).width() - land.outerWidth()) / 2;
  if (land.height() >= $(window).height()) th = 0;
  land.animate({ top: th, opacity: 'show', left: rw }, t);
};

$(function() {
  bgimg();
  landCenter('#login-box', 500);
});

$(window).resize(function() {
  bgimg();
  landCenter('#login-box', 50);
});
