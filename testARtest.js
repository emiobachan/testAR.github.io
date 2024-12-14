// バックエンドからどの折り紙で遊ぶのか値を受け取る
// heart,ship,turtle
sb = 'turtle';

// ボタン押下で画像表示・削除
const takeButton = document.querySelector('#take');
const restartButton = document.querySelector('#del');
const taking = document.querySelector('#taking');
const scene = document.querySelector('a-scene');


if(takeButton){
    takeButton.addEventListener('click', function(event){
        event.preventDefault();
        let video = document.querySelector('video');
        let snap = takeSnapshot(video);
        // 画像表示
        const image = document.createElement('img');
        image.setAttribute('id','snapshot');
        image.setAttribute('src', snap);
        image.classList.add("visible");
        taking.appendChild(image);
    });
}
if(restartButton){
    restartButton.addEventListener('click', function(event){
        event.preventDefault();
        // 画像非表示
        const imagee = document.querySelector('#snapshot');
        imagee.removeAttribute('src');
        imagee.classList.remove("visible");
        imagee.remove();
    });
}
function takeSnapshot(video){
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
        canvasCtx.drawImage(aCanvas,0,0,widwidth,heiheight);
        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return canvas.toDataURL('image/png')
    }
}

if(sb == 'turtle'){
    // 声でオブジェクトを操作する
    let txt;  // 回答の保持用
    const obobob = document.querySelector('#obobob');
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    // recognition.interimResults = true;
    recognition.onend = function(){
        recognition.start();
    } 
    recognition.onresult = function(event) {
        txt = event.results[0][0].transcript;
        if(txt.includes('回って') || txt == '回って'){
            console.log(txt);
            obobob.setAttribute('animation__001',
                {
                'property': 'rotation',
                'from':{x: 0, y: 0, z: 0},
                'to': {x: 0, y: 360, z: 0},  
                }
            );
        }
    }
    recognition.start();
}