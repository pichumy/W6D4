const DOMNodeCollection = require('./dom_node_collection.js');

function $l (arg) {
  let funcs = [];

  if (arg instanceof HTMLElement){
    let domnode = new DOMNodeCollection([arg]);
    return domnode;
  } else if (arg instanceof Function) {
    if (document.readyState === "complete" || document.readyState === "loaded") {
      arg();
    } else {
      funcs.push(arg);
    }
  } else {
    const elements = document.querySelectorAll(arg);
    let array = Array.from(elements);
    return array;
  }
  document.addEventListener("DOMContentLoaded", () => {
    funcs.map( el => el());
  });

}

$l.extend = function(...params){
  let object = {};
  params.map(el => {
    let keys = Object.keys(el);
    keys.map(key => {
      object[key] = el[key];
    });
  });
  return object;
};

$l.ajax = function(options){
  const xhr = new XMLHttpRequest();
  const type = options.type || "GET";
  xhr.open(type, options.url);

  xhr.onload = options.success;
  xhr.onerror = options.error;
  // type
  // url
  // success
  // error

  // xhr.send(options.data);
  // return new Promise(xhr.onload, xhr.onerror); // this is wrong, promise should not have anything passed in yet, and should be able to have functions passed in through .then or something
};

window.$l = $l;
