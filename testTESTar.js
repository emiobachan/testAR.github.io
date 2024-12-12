// 本当はバックエンドから何らかの形で画像パスと折り紙名のセットが送られてくる
let rowImages = {
    "paths":[
        "kabuto_blue.png",
        "active_kid.jpg",
        "image_plane.jpg",
        "images.jpg",
        "imagessss.jpg",
        "remember.jpg"
    ],
    "names":[
        "heart",
        "ship",
        "heart",
        "ship",
        "turtle",
        "heart"
    ]

}
const paths = rowImages.paths;
const names = rowImages.names;

// 画像の中のどれか一枚をランダムに選ぶ
const photo = Math.floor(Math.random()*paths.length);
const image = paths[photo];
console.log(names[photo]);

// アセットの中にimgを生成
const asset = document.querySelector("a-assets")
let imageeee = document.createElement("img");
imageeee.setAttribute("id", image);
imageeee.setAttribute("src", image);
asset.appendChild(imageeee);

// 画像の画面表示を行う関数
const createTergetImage = function(img){
    let tergetImage = document.createElement("a-entity");
    tergetImage.object3D.position.set(0, 3, -8);
    tergetImage.innerHTML=`<a-box color='white' rotation='0 0 0' scale='4 3 0' src='${img}'></a-box>`;
    return tergetImage;
}
// 文字の画面表示を行う関数
const createCharacters = function(chars,scales,positions){
    let charactoers = document.createElement("a-entity");
    charactoers.setAttribute("text",{value: chars, color: 'black'});
    charactoers.setAttribute("scale",{x:scales[0], y:scales[1], z:scales[2]});
    charactoers.object3D.position.set(positions[0],positions[1],positions[2]);
    return charactoers;
}
// エフェクトの画面表示を行う関数
const createEffect = function(positions) {
  var effect = document.createElement('a-entity');
  effect.setAttribute('raycaster', 'enabled: false');
  effect.setAttribute('particle-system', 'preset:star;');
  effect.object3D.position.set(positions[0],positions[1],positions[2]);
  return effect;
};

// 画像,質問,回答開始宣言ボタンをAR空間に表示する
let scene = document.querySelector('a-scene');
let tergetImage = createTergetImage(image);
let question = createCharacters("what's this?",[5,5,0.1],[1.9,0,-2]);
let ansButton = createCharacters("Let's answer!", [5,5,0.1],[1.85,-0.5,-2]);
ansButton.setAttribute("id","startans");
scene.appendChild(tergetImage);
scene.appendChild(question);
scene.appendChild(ansButton);

// 回答設定
let txt;  // 回答の保持用
const recognition = new webkitSpeechRecognition();
recognition.lang = 'jp-JP';
// recognition.interimResults = true;
recognition.onresult = function(event) {
  txt = event.results[0][0].transcript;
  startans.setAttribute("text",{value: txt});
  console.log(txt);
// 回答の正誤判定
  if(txt == names[photo]){
    // 正解のエフェクト
    console.log('correct');
    let effect = createEffect([0,3,-15],1500);
    scene.appendChild(effect);
  }
  else{
    // 不正解のエフェクト
    console.log('nice');
  }
}

// 回答
const startans = document.querySelector("#startans");
startans.addEventListener('click',()=>{
  recognition.start();
  startans.setAttribute("text",{value: "please answer"});
});
startans.setAttribute("text",{value: txt});

