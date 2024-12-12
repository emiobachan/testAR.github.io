// ボタン押下でスクショ・画像表示
const takeButton = document.querySelector('#take');
const restartButton = document.querySelector('#del');
const scene = document.querySelector('a-scene');
const image = document.querySelector('#snapshot');

if(takeButton){
    takeButton.addEventListener('click', function(event){
        event.preventDefault();
        let video = document.querySelector('video');
        let snap = takeSnapshot(video);
        // 画像表示
        image.setAttribute('src', snap);
        image.classList.add("visible");
        // 削除ボタン表示
    });
}

if(restartButton){
    restartButton.addEventListener('click', function(event){
        event.preventDefault();
        image.removeAttribute('src');
        image.classList.remove("visible");
        window.location.reload();
    });
}

function takeSnapshot(video){
    // Here we're using a trick that involves a hidden canvas element.  
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');

    let widwidth = video.videoWidth;
    let heiheight = video.videoHeight;

    if (widwidth && heiheight) {
        // Setup a canvas with the same dimensions as the video.
        canvas.width = widwidth;
        canvas.height = heiheight;

        // Make a copy of the current frame in the video on the canvas.
        canvasCtx.drawImage(video, 0, 0, widwidth, heiheight);
        
        let aCanvas = scene.components.screenshot.getCanvas('perspective');
        canvasCtx.drawImage(aCanvas,0,0,video.videoWidth,video.videoHeight);

        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return canvas.toDataURL('image/png')
    }
}

// 声でオブジェクトを操作する
let txt;  // 回答の保持用
const recognition = new webkitSpeechRecognition();
recognition.lang = 'jp-JP';
// recognition.interimResults = true;
recognition.start();
recognition.onresult = function(event) {
  txt = event.results[0][0].transcript;
  console.log(txt);
  if(txt == 'まわる'){
    // 正解のエフェクト
    console.log('correct');
  }
}

// 文字の画面表示を行う関数
const createCharacters = function(chars,scales,positions){
    let charactoers = document.createElement("a-entity");
    charactoers.setAttribute("text",{value: chars, color: 'black'});
    charactoers.setAttribute("scale",{x:scales[0], y:scales[1], z:scales[2]});
    charactoers.object3D.position.set(positions[0],positions[1],positions[2]);
    return charactoers;
}