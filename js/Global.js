// ------------------
//  GLOBAL VARIABLES
// ------------------
var scene, renderer, clock, delta; // variaveis gerais relativas a animacao
var cameras, camera, camera1, camera2, camera3, camera4, camera5, camera6;  // diferentes tipos de cameras
var geometry, material, mesh;
var board, ball, cube; // diferentes objetos a desenhar
var lights, currentLight, directionalLight, pointLight;  // diferentes tipos de luz
var ballAcc = 0.07;
var lKey = false;   // variaveis que serao ativadas quando pressionadas as teclas respetivas
var wKey = 0;
var dKey = false;
var pKey = false;
var sKey = true;

var lightCalculation = 1;

// --------------------
//  TEXTURES VARIABLES
// --------------------
var texture      = new THREE.TextureLoader();



