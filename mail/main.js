const Router = require("./router.js");
const Inbox = require("./inbox.js");
const MessageStore = require("./message_store.js");

const routes = {
  // compose: ,
  inbox: Inbox,
  // sent:
};

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll('.content');
  let router = new Router(content, routes);
  router.start();
  const $li = document.querySelectorAll('.sidebar-nav li');
  $li.forEach(el => {
    el.addEventListener("click", () => {
      let innerText = el.innerText;
      innerText = innerText.toLowerCase();
      window.location.hash = innerText;
    });
  });
});
