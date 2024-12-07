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

// xrHitTestSourceの取得
let scene = document.querySelector('a-scene');
// let renderer = scene.renderer;
// let session = renderer.xr.getSession();
// let viewerSpace = await session.requestReferenceSpace("viewer");
// let xrHitTestSource = await session.requestHitTestSource({
//     space: viewerSpace
// });
// // hitTestResultの取得と解析
// let frame = scene.frame;
// let refSpace = renderer.xr.getReferenceSpace();
// let hitTestResults = frame.getHitTestResults(refSpace);
// const pose = hitTestResults[0].getPose(refSpace);
// target.setAttribute("position", pose.transform.position);
// target.object3D.quaternion.copy(pose.transfrom.orientation);

// // AFRAME.registerComponent("ar-hit-test", {
// //     init: function() {
// //         // session start
// //         this.el.sceneEl.renderer.xr.addEventListener("sessionstart", async () => {
// //             if (this.el.sceneEl.is("ar-mode")) {
// //                 this.renderer = this.el.sceneEl.renderer;
// //                 let session = this.renderer.xr.getSession();
// //                 let viewerSpace = await session.requestReferenceSpace("viewer");
// //                 this.xrHitTestSource = await session.requestHitTestSource({
// //                     space: viewerSpace
// //                 });
// //             }
// //         });

// //         // session end
// //         this.el.sceneEl.renderer.xr.addEventListener("sessionend", async () => {
// //             this.xrHitTestSource = null;
// //         });
// //     },
// //     tick: function() {

// //         const frame = this.el.sceneEl.frame;
// //         if (!frame) return;
        
// //         // hit-test in real world
// //         const xrHitTestSource = this.xrHitTestSource;
// //         if (xrHitTestSource) {
// //             const refSpace = this.renderer.xr.getReferenceSpace();
// //             const hitTestResults = frame.getHitTestResults(xrHitTestSource);
// //             if (hitTestResults.length > 0) {
// //                 const pose = hitTestResults[0].getPose(refSpace);
// //                 this.el.setAttribute("position", pose.transform.position);
// //                 this.el.object3D.quaternion.copy(pose.transform.orientation);
// //             }
// //         }
// //     }
// // });


// アセットの中にimgを生成
const asset = document.querySelector("a-assets")
images.forEach((image)=>{
    let imageeee = document.createElement("img");
    imageeee.setAttribute("id", image);
    imageeee.setAttribute("src", image);
    asset.appendChild(imageeee);
});


// // 遠すぎない位置に表示するため、上下、左右、奥行のそれぞれがとりうる値のプリセットを作成しておく
// let upDownPosition = [];
// for(let i=0;i<51;i++){
//     upDownPosition[i] = i-25;
// }
// let leftOrRightPosition = [];
// for(let i=0;i<51;i++){
//     leftOrRightPosition[i] = i-25;
// }
// let depthPosition = [];
// for(let i=0;i<61;i++){
//     depthPosition[i] = i-30;
// }
// // 奥行きは-5～5の値を避ける 3Dがお粗末なので真上や真横真下から見られないようにしておく
// depthPosition.splice(25,11);

// //額装した画像がかぶらない(=上下左右のpositionがかぶらない)ランダムな表示位置を画像ポジションオブジェクトに格納する 画像パス:[ポジション]
// let imagePositions = [];
// /**
//  * todo 奥行の正負が一致する&&上下左右のpositionがかぶるランダムなpositionを排除する */ 
// images.forEach(()=>{
//     imagePositions.push([
//         leftOrRightPosition[Math.floor(Math.random()*leftOrRightPosition.length)], 
//         upDownPosition[Math.floor(Math.random()*upDownPosition.length)], 
//         depthPosition[Math.floor(Math.random()*depthPosition.length)]
//     ]);
// })


// 額装エンティティを作成する関数
const createFramedImage = function(img){
    let framedImage = document.createElement("a-entity");
    framedImage.setAttribute("id", img);
    framedImage.object3D.position.set(leftright, updown, -15);
    framedImage.innerHTML=`<a-box color='white' rotation='0 0 0' scale='2.7 3.7 0' src='#${img}'></a-box> <a-box color='#EEE1D1' position='0 2 0.2' rotation='45 0 0' scale='3 0.3 0.3'></a-box><a-box color='#EEE1D1' position='0 -2 0.2' rotation='45 0 0' scale='3 0.3 0.3'></a-box><a-box color='#EEE1D1' position='-1.5 0 0.2' rotation='0 45 90' scale='4 0.3 0.3'></a-box><a-box color='#EEE1D1' position='1.5 0 0.2' rotation='0 45 90' scale='4 0.3 0.3'></a-box>`;
    return framedImage;
}

// 特定の要素の中に額装エンティティを追加する関数
const addFramedImageTo = function(elm,framedImage){
    elm.appendChild(framedImage);
    if(leftright<5){
        leftright = leftright + 5;
    }else{
        updown = updown - 6; 
        leftright = -10;  
    }
}


// 送られてきた画像パスと同じ数の額装画像を生成する idはパス、
let leftright = -10;
let updown = 0;
images.forEach((image)=>{
    // 額装エンティティを作成してa-sceneに追加
    let framedImage = createFramedImage(image);
    addFramedImageTo(scene, framedImage);
})