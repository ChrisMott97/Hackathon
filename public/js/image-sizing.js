document.addEventListener("load", update);
window.addEventListener("resize", update);

var containers = document.querySelectorAll(".img-container");

function update(){
    containers.forEach(function(container){
        var child = container.children[0];

        if (container.offsetHeight > child.offsetHeight + 2){
            container.classList.add("height");
        } else if (container.offsetWidth > child.offsetWidth + 2){
            container.classList.remove("height");
        }
    })
}
