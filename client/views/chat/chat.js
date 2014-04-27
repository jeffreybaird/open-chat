Template['chat'].helpers({
  chatroom: function(){
    return Session.get("name")
  },
  nickname: function(){
    return Session.get('nickname') || 'Anonymous'
  }
});


Template['chat'].events({
  'keydown #message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      nickField = document.getElementById('nickname')
      if (nickField.value != '') {
        Session.set('nickname', nickField.value)
      } else {
        nickField.value = 'Anonymous'
      }
      var name = Session.get('nickname') || document.getElementById('nickname').value ;
      var message = document.getElementById('message');
      if (message.value != '') {
        Chat.update({_id: Session.get("id")}, {$push:{messages:{name: name, message: message.value, time: new Date}}});
        document.getElementById('message').value = '';
        message.value = '';
      }
      var ourLastChatRecord = $('.msg-container').last();
      $('.messages-container').animate({scrollTop: $('.msg-container').last().offset().top -200});
    }
  },
  'keydown #nickname' : function (event) {
    if (event.which == 13 ) {
      var nickname = $('#nickname').val();
      Session.set("nickname", nickname);
      ReactiveStore.set("clink-nickname", nickname);
    }
  },
  'blur #nickname' : function (event) {
    Session.set("nickname", document.getElementById('nickname').value || 'Anonymous');
  }
});

Template.chat.rendered = function () {
     $(window).resize(function(){
      var ourWindowHeight = $(window).height();
      $('.messages-container').css("height", ourWindowHeight -350);
    });
    $('#message').focus();
    $('.toggle-name-input').click(function(e) {
      e.preventDefault();
      $('.chat-options').toggleClass('hide');
    });
}
