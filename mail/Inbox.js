const MessageStore = require("./message_store.js");

const Inbox = {
  render: function(){
    let $ul = document.createElement("ul");
    $ul.className = "messages";
    let messages = MessageStore.getInboxMessages();
    messages.forEach( (message) => {
      $ul.appendChild(this.renderMessage(message));
    });
    return $ul;
  },
  renderMessage: function(message){
    let $li = document.createElement("li");
    $li.className = "message";
    let from = document.createElement("span");
    from.innerHTML = message.from;
    from.className = "from";
    $li.appendChild(from);
    let subject = document.createElement("span");
    subject.innerHTML = message.subject;
    subject.className = "subject";
    $li.appendChild(subject);
    let body = document.createElement("span");
    body.innerHTML = message.body;
    body.className = "body";
    $li.appendChild(body);
    return $li;
  }

};

module.exports = Inbox;
