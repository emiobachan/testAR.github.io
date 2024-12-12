

// 画像の画面表示を行う関数
const createImage = function(img,scales,positions){
    let tergetImage = document.createElement("a-entity");
    tergetImage.setAttribute("scale",{x:scales[0], y:scales[1], z:scales[2]});
    tergetImage.object3D.position.set(positions[0],positions[1],positions[2]);
    tergetImage.innerHTML=`<a-box color='white' rotation='0 0 0' src='${img}'></a-box>`;
    return tergetImage;
}

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
        restartButton.classList.remove('disabled')
    });
}


if(restartButton){
    restartButton.addEventListener('click', function(event){
        event.preventDefault();
        image.removeAttribute('src');
        image.classList.remove("visible");
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
