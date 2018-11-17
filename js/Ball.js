class Ball extends THREE.Object3D{

    changeToBasic(){
        this.children[0].material  = this.userData.basicMaterial;
    }
    changeToPhong(){
        this.children[0].material  = this.userData.phongMaterial;       
    }
    rotate(delta){
        var vccTest = this.userData.vcc + this.userData.acc * delta;
        if(vccTest <= this.userData.vccMax){
            this.userData.vcc = vccTest;
        }
        if(vccTest <= 0)
            this.userData.acc = 0;
        this.userData.matrix.makeRotationY(this.userData.vcc);
        this.position.applyMatrix4(this.userData.matrix);
    }

    constructor(x,z,diameter, acceleration){
        'use strict'
        super();

        var yellow1 = new texture.load("textures/ball_one.jpg");
        var basic = new THREE.MeshBasicMaterial({map: yellow1, side: THREE.FrontSide});
        var phong = new THREE.MeshPhongMaterial({map: yellow1, side: THREE.FrontSide, specular: 0xffffff, shininess: 300});

        this.userData = {
            basicMaterial: basic,
            phongMaterial: phong,
            moving: false,
            vcc: 0,
            vccMax: 0.2,
            acc: acceleration,
            matrix: new THREE.Matrix4()
        }

        this.position.x = x;
        this.position.y = diameter/2;
        this.position.z = z;
    
        geometry = new THREE.SphereGeometry(diameter/2, 30, 30);
        mesh = new THREE.Mesh(geometry, this.userData.phongMaterial);

        this.add(mesh);
    }
}
