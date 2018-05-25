class Router {
  constructor(node, routes){
    this.node = node;
    this.routes = routes;
  }

  start(){
    this.render();
    window.addEventListener("hashchange", this.render.bind(this));
  }

  activeRoute(){
    let hash_fragment = window.location.hash;
    return this.routes[hash_fragment.slice(1)];
  }

  render(){
    let component = this.activeRoute();
    if (component === undefined){
      this.node[0].innerHTML = "";
      return;
    }else {
      this.node[0].innerHTML = "";
      this.node[0].appendChild(component.render());
      return;
    }

  }

}

module.exports = Router;
