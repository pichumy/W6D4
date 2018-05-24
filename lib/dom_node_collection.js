class DOMNodeCollection {
    constructor(htmlelements){
      this.elements = htmlelements;
    }
    html (string){
      if(string === undefined){
        return this.elements[0].innerHTML;
      }else{
        this.elements.map((el)=>{
          el.innerHTML = string;
        });  
      }
    }
    empty(){
      this.elements.map(el => el.innerHTML = "");
    }
    append(input){
      if(input instanceof Array){
        this.elements.map(el => {
          input.map(input_el => {
            el.innerHTML = el.innerHTML + input_el.outerHTML;
          });
        });
      }else if(input.constructor === String){
        this.elements.map(el => {
          el.innerHTML = el.innerHTML + input; 
        });
      }else if (input instanceof HTMLElement){
        this.elements.map(el => {
          el.innerHTML = el.innerHTML + input.outerHTML;
        });
      }
    }
    
    attr(...args){
      if (args.length > 1){
        let text = args[0];
        this.elements[0].attributes[text] = args[1];
        return args[1]; // do the setter thing
      }else if (args.length === 1){
        let text = args[0];
        return this.elements[0].attributes[text];
        // do the getter thing. this should be a hash, but we'll do that later TO:DO
      }
    }
    
    addClass(className){
      this.elements.map(element => {
        element.classList.add(className);
      }); 
    }
    
    removeClass(className){
      this.elements.map(element => {
        element.classList.remove(className);
      }); 
    }
    
    children() {
      let array = [];
      // TODO: from array so we can use concat 
      this.elements.map( el => { array.push(el.children); });
      const allChildren = new DOMNodeCollection(array);
      return allChildren;
    }
    
    parent(){
      let array = [];
      this.elements.map(el => { array.push(el.parentElement);});
      return new DOMNodeCollection(array);
    }
    
    find(className){
      let array = [];
      this.elements.map(el => {
        let things = el.querySelectorAll(className);
        let thingArray = Array.from(things);
        array = array.concat(thingArray);
      });
      return new DOMNodeCollection(array);
    }
    
    remove(){
      this.elements.map(el => el.remove());
    }
    
    on(type, callback) {
      this.elements.forEach( el => {
        // el.eventCallback = callback;
        el.addEventListener(type, callback);
      });
    }
    
    off(type) {
      this.elements.forEach( el => {
        el.removeEventListener(type, el.eventCallback);
      });
    }
}

module.exports = DOMNodeCollection;
// 
// array = $l('.test-div')
// domnode = $l(array[0])