/*Cena Interativa com Luz Pontual, Mensagens e Texturas*/

function createMainScene() {
    'use strict';

    mainScene = new THREE.Scene();

    board   = new Board(0,0,0);
    ball    = new Ball(-25,0,14,0xffffff);
    cube    = new Cube(0,0,15);
    cameras = new Cameras();
    lights   = new Lights(); 
    camera  = camera1;

    mainScene.add(camera);
    mainScene.add(board);
    mainScene.add(ball);
    mainScene.add(cube);
}


function createPauseScene(){
    'use strict';

    pauseScene = new THREE.Scene();

    wall = new Wall(0,0,40);
    
    pauseScene.add(wall);
    pauseScene.add(camera2);
}


function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 68: // D (change directionalLight intensity)
        if(!sKey){
            dKey = true;
        }
        break;
    case 80: // P (change pointLight intensity)
        if(!sKey){
            pKey = true;
        }
        break;
    case 76: // L (toogle lightCalculation)
        if(!sKey){
            lKey = true;
        }
        break;
    case 66: // B (toogle ball movement)
        if(!sKey){
            if(ball.userData.acc == 0)
                ball.userData.acc = 0.07;
            else
                ball.userData.acc = -1 * Math.sign(ball.userData.acc) * Math.abs(ball.userData.acc);
        }
        break;
    case 83: // S (pause)
        if(sKey){
            camera = camera1;
            camera = camera1;
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.enableKeys = true;
            cc2c.enableRotate = false;
            cc2c.enableZoom = false;
            cc2c.enableKeys = false;
            scene = mainScene;
            sKey = false;
        }
        else{
            camera = camera2;
            cc2c.enableRotate = true;
            cc2c.enableZoom = true;
            cc2c.enableKeys = true;
            controls.enableRotate = false;
            controls.enableZoom = false;
            controls.enableKeys = false;
            scene = pauseScene;
            sKey = true;
        }
        break;
    case 82: // R (refresh)
        if(sKey){
            createMainScene();
            scene = mainScene;
            sKey = false;
        }
    }
}


function update() {

    delta = clock.getDelta();

    if(dKey){
        if( spotLight.intensity == 1){
            spotLight.intensity = 0;
        }else{
            spotLight.intensity = 1;
        }
        dKey = false;
    }

    if(pKey){
        if(pointLight.intensity == 4){
            pointLight.intensity = 0;
        }else{
            pointLight.intensity = 4;
        }
        pKey = false;
    }

    if(lKey){
        if(lightCalculation == 1){
            lightCalculation = 0;
            ball.changeToBasic();
            cube.changeToBasic();
            board.changeToBasic();
        }else{
            lightCalculation = 1;
            ball.changeToPhong();
            cube.changeToPhong();
            board.changeToPhong();
        }
        lKey = false;
    }

    if(!sKey)
        if(ball.userData.acc != 0)
            ball.rotate(delta);

    camera.lookAt(scene.position);
    controls.update();
    cc2c.update();

}



function render() {
    'use strict';
    renderer.render(scene, camera);
}


function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}


function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();

    createMainScene();
    createPauseScene();

    scene = mainScene;

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}


function animate() {
    'use strict';

    update();

    render();

    requestAnimationFrame(animate);
}