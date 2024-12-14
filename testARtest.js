// バックエンドからどの折り紙で遊ぶのか値を受け取る
// heart,ship,turtle
sb = 'turtle';

// ボタン押下で画像表示・削除
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
    });
}
if(restartButton){
    restartButton.addEventListener('click', function(event){
        event.preventDefault();
        // 画像非表示
        image.removeAttribute('src');
        image.classList.remove("visible");
        image.style.display = 'none'
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
        console.log(txt);
        if(txt.includes('回って') || txt == '回って'){
            console.log(txt);
            obobob.setAttribute('animetion',
                {'property': 'rotation', 
                'to': {x:350, y:180, z:0}, 
                'dur':1000}
            );
        }
        // else if(txt == 'こっちに来て' || txt == 'こっち来て'){
    
        // }
        // else if(txt == 'あっち行って'){
    
        // }
        // else if(txt == 'たのしい' || txt == 'うれしい'){
    
        // }
    }
    recognition.start();
}