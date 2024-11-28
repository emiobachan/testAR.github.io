// 本当はバックエンドから何らかの形で画像パスが送られてくる
let rowImages = {
    "paths":[
        "kabuto_blue.png",
        "active_kid.jpg",
        "image_plane.jpg",
        "images.jpg",
        "imagessss.jpg",
        "remember.jpg"
    ]
}
const images = rowImages.paths;
console.log(images);

// 遠すぎない位置に表示するため、上下、左右、奥行のそれぞれがとりうる値のプリセットを作成しておく
let upDownPosition = [];
for(let i=0;i<61;i++){
    upDownPosition[i] = i-25;
}
let leftOrRightPosition = [];
for(let i=0;i<61;i++){
    leftOrRightPosition[i] = i-25;
}
let depthPosition = [];
for(let i=0;i<61;i++){
    depthPosition[i] = i-30;
}
// 奥行きは-5～5の値を避ける 3Dがお粗末なので真上や真横真下から見られないようにしておく
depthPosition.splice(25,11);


// 額装した画像がかぶらない(=上下左右のpositionがかぶらない)ランダムな表示位置を画像ポジションオブジェクトに格納する 画像パス:[ポジション]
let imagePositions = {};
// todo 奥行の正負が一致する&&上下左右のpositionがかぶるランダムなpositionを排除する
console.log(image);
images.forEach((image)=>{
    imagePositions[image] = [
        Math.floor(Math.random()*leftOrRightPosition.length), 
        Math.floor(Math.random()*upDownPosition.length), 
        Math.floor(Math.random()*depthPosition.length)
    ];
})
console.log(imagePositions);

// 送られてきた画像パスと同じ数の額装画像を生成する idはパス、
images.forEach((image)=>{
    AFRAME.registerComponent(imagePositions.image,{
        init: function(){}
    })
    let framedImage = document.createElement("a-entity");
    CustomElementRegistry.setAttribute(imagePositions.image,"")

    const ascene = document.querySelector("a-scene");
    ascene.insertAdjacentHTML("beforeend",addList);
})
