const contents = document.querySelectorAll(".content1");
const rightHand = document.querySelector("#rightHand");
var entity = document.querySelector('[sound]');

console.log(contents);
console.log(rightHand);
rightHand.addEventListener("thumbup",()=>{
    contents.forEach(content,()=>{
        content.object3D.position.set(0,8,-5);
    })
})
contents.forEach(content,()=>{
    content.addEventListener("click",()=>{
        entity.components.sound.playSound();
    })
})