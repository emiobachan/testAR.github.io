let sb = 'crane';
// ボタン押下で画像表示・削除
const takeButton = document.querySelector('#take');
const restartButton = document.querySelector('#del');
const taking = document.querySelector('#taking');
const imgg = document.querySelector('#imgg');
const scene = document.querySelector('a-scene');


if(takeButton){
    takeButton.addEventListener('click', function(event){
		if(document.querySelector('#snapshot')){
			return;
		}
        event.preventDefault();
        let video = document.querySelector('video');
        let snap = takeSnapshot(video);

        // 画像表示
        const image = document.createElement('img');
        image.setAttribute('id','snapshot');
        image.setAttribute('src', snap);
        image.classList.add("visible");
        imgg.appendChild(image);
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


if(sb == 'heart'){
    const obobob = document.createElement('a-entity');
    obobob.setAttribute('id','obobob');
    obobob.setAttribute('gltf-model',`#heart`);
    obobob.setAttribute('scale','0.00002 0.00002 0.00002');
    obobob.setAttribute('position','0.0045 0.004 -0.02');
    obobob.setAttribute('rotation','90 180 0');
    obobob.setAttribute('color','#ff69b4')
    scene.appendChild(obobob);
}


    // 声でオブジェクトを操作する
if(sb == 'crane' || sb == 'ship'){
    let txt;  // 回答の保持用
    const obobob = document.createElement('a-entity');
    obobob.setAttribute('id','obobob');
    obobob.setAttribute('gltf-model',`#crane`);
    obobob.setAttribute('scale','0.0015 0.0015 0.0015');
    obobob.setAttribute('position','0.0015 0.0015 -0.01');
    obobob.setAttribute('animation',{
        property: 'rotation',
        from: {x:0, y:0, z:0},
        to: {x:0, y:360, z:0},
        loop: true,
        startEvents: 'rotate',
        pauseEvents: 'stpRotate',
        resumeEvents: 'rsmRotate',
        dur: 2000});
    scene.appendChild(obobob);
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    // recognition.interimResults = true;
    recognition.onresult = function(event) {
        txt = event.results[0][0].transcript;
	    console.log(txt);
        if(txt.includes('回って') || txt.includes('まわって')){
            obobob.emit('rotate');
            obobob.emit('rsmRotate');
        }
        if(txt.includes('止まって') || txt.includes('とまって')){
            obobob.emit('stpRotate');
        }
    }
    recognition.onend = function(){
        recognition.start();
    } 
    recognition.start();
}

if(sb == 'turtle'){
    // 声でオブジェクトを操作する
    let txt;  // 回答の保持用
    const obobob = document.createElement('a-entity');
    obobob.setAttribute('id','obobob');
    obobob.setAttribute('gltf-model',`#turtle`);
    obobob.setAttribute('scale','0.001 0.001 0.001');
    obobob.setAttribute('position','0 -0.001 -0.04');
    obobob.setAttribute('rotation','0 180 0');
    obobob.setAttribute('animation__0',{
        property: 'position',
        to: {x:0, y:-0.001, z:-0.08},
        loop: false,
        startEvents: 'go',
        pauseEvents: 'stpGo'});
    obobob.setAttribute('animation__1',{
        property: 'position',
        to: {x:0, y:-0.001, z:-0.015},
        loop: false,
        startEvents: 'come',
        pauseEvents: 'stpCome'});
    obobob.setAttribute('animation__2',{
        property: 'position',
        to: {x:0, y:-0.001, z:-0.04},
        loop: false,
        startEvents: 'home',
        pauseEvents: 'stpHome'});
    scene.appendChild(obobob);
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    // recognition.interimResults = true;
    recognition.onresult = function(event) {
        txt = event.results[0][0].transcript;
        console.log(txt);
        if(txt.includes('こっち来て') || txt.includes('こっちきて')){
            obobob.emit('come');
        }
        if(txt.includes('あっち行って') || txt.includes('あっちいって')){
            obobob.emit('go');
        }
        if(txt.includes('戻って') || txt.includes('きすぎ')){
            obobob.emit('home');
        }
        if(txt.includes('止まって') || txt.includes('とまって')){
            obobob.emit('stpCome');
        }
    }
    recognition.onend = function(){
        recognition.start();
    } 
    recognition.start();
}
