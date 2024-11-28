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

// 範囲内でランダムに額装
// 範囲……上下左右-25～25　遠近-30～+30　　　暫定

images.forEach((image)=>{
})


// ランダムな表示位置を取得するメソッド
// 配列の作成→ok
let updownOrLeftRight = [];
for(let i=0;i<51;i++){
    updownOrLeftRight[i] = i-25;
}
let depth = [];
for(let i=0;i<61;i++){
    depth[i] = i-30;
}

// 
function getRandomPositionUDLR(){
    

}
let imgUpdown = Math.floor(Math.random()*(25-(-25)+1)-25);
let imgLeftRight = Math.floor(Math.random()*(25-(-25)+1)-25);
let imgDepth = Math.floor(Math.random()*(30-(-30)+1)-30);




// 画像に対して額縁の位置を自動で算出
// const framedImages = document.querySelectorAll(".framedImage");
// let i = 2;
// framedImages.forEach((framedImage)=>{
//     framedImage.object3D.position.set(i, i, i);
//     console.log(image.object3D.position.x);
//     i++;
// })
const framedImage1 = document.querySelector("#framedImage1");
framedImage1.object3D.position.set(2,3,-16)





// 挙動確認
// const contents = document.querySelectorAll(".content1");
// const rightHand = document.querySelector("#rightHand");
// const entity = document.querySelector('[sound]');

// console.log(contents);
// console.log(rightHand);
// rightHand.addEventListener("thumbup",()=>{
// contents.forEach(content,()=>{
//     content.object3D.position.set(0,8,-5);
// })
// })
// contents.forEach(content,()=>{
// content.addEventListener("click",()=>{
//     entity.components.sound.playSound();
// })
// })