/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";  // only for typing
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import {shaderMaterial} from "../libs/CS559-Framework/shaderHelper.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";

import { TrackCar } from "../examples/track.js";
import { ShinySculpture } from "../examples/shinySculpture.js";
import { MorphTest } from "../examples/morph.js";
import { GrTrees, GrSnow, GrHelipad, GrCarousel, GrAirplane1, GrAirplane2, GrBall, GrTrack, GrCar3,GrMud, GrCar} from "./myObj.js";
import {GrBuilding1,GrBuilding2,GrBuilding3} from "../for_students/house.js";
import { ForkLift, GantryCrane } from "./construction.js";




function grtown() {
  // make the world
  let world = new GrWorld({
    width: 1500,
    height: 800,
    groundplane: null,
    groundplanesize: 0, // make the ground plane big enough for a world of stuff
    groundplanecolor: "#522F04"
  })
   

  
  let loader = new T.CubeTextureLoader();
  loader.setPath('./textures/');
  let envTexture = loader.load([
    "skyLeft.jpg", "skyRight.jpg",
    "skyTop.jpg", "skyBottom.jpg",
    "skyFront.jpg", "skyBack.jpg"
  ]);

  let bumpTexture = new T.TextureLoader().load( './textures/land.png' );
	bumpTexture.wrapS = bumpTexture.wrapT = T.RepeatWrapping; 
	let bumpScale   = 5.0;
  envTexture.format = T.RGBFormat;
  world.scene.background = envTexture;

  let grassTexture = new T.TextureLoader().load( './textures/grass.png' );
  grassTexture.wrapS = grassTexture.wrapT = T.RepeatWrapping; 

  let mudTexture = new T.TextureLoader().load( './textures/wetmud.jpg' );
  mudTexture.wrapS = mudTexture.wrapT = T.RepeatWrapping; 

  let rockyTexture = new T.TextureLoader().load( './textures/rock.jpg' );
	rockyTexture.wrapS = rockyTexture.wrapT = T.RepeatWrapping; 
	
  let customUniforms = {
    bumpTexture:	{ type: "t", value: bumpTexture },
		bumpScale:	    { type: "f", value: bumpScale },
		rockyTexture:	{ type: "t", value: rockyTexture },
    grassTexture:	{ type: "t", value: grassTexture },
    mudTexture: {type:"t",value: mudTexture}
      
  };
  var customMaterial = shaderMaterial("./mountain.vs","./mountain.fs",{
    uniforms: customUniforms,
    side: T.DoubleSide
});

let geometryPlane = new T.PlaneBufferGeometry(70, 70, 50, 50);
let terrain = new GrObject("terrain", new T.Mesh( geometryPlane, customMaterial ));
geometryPlane.rotateY(Math.PI/2)
geometryPlane.rotateZ(Math.PI/2)
geometryPlane.translate(0,-1.8,0)
world.add(terrain)

  
  let building_indx;
    for(building_indx = -1; building_indx < 2; building_indx ++){
        world.add(new GrBuilding3({z:building_indx*7 + 2,x:-22, size:2.3, rotate:1}));
    }
    for(building_indx = -1; building_indx < 2; building_indx ++){
        world.add(new GrBuilding2({z:building_indx*7 - 2,x:22, size:2.3, rotate:2}));
        world.add(new GrBuilding2({z:building_indx*7 - 2,x:30, size:2.3, rotate:2}));
    }
    for(building_indx = -1; building_indx < 2; building_indx ++){
        world.add(new GrBuilding1({x:building_indx*7 - 2,z: -23, size:2.6, rotate:0}));
        world.add(new GrBuilding1({x:building_indx*7 - 2,z: -31,size:2.6, rotate:0}));
    }

  

  /** Race Track - with three things racing around */
  let track = new GrTrack();
  let tc3 = new TrackCar(track);

  // place things are different points on the track
  tc3.u = 0.125;
  let car3 = new GrCar3(track);
  let car = new GrCar(track);
  car.u =0.25
  car3.u = 0.35;
  world.add(car3);
  world.add(car);
  
  // and make sure they are in the world
  world.add(track);
  world.add(tc3);

  /** Helicopter - first make places for it to land*/
    world.add(new GrHelipad(-15, 0.5, 17, 1));
    world.add(new GrHelipad(15, 0.5, 17, 1));
    world.add(new GrHelipad(0, 0.5, -14, 1));
    let airplane = new GrAirplane2();
    world.add(airplane);
    airplane.getPads(world.objects);

    world.add(new GrAirplane1)


  //trees
  world.add(new GrTrees({ x: -25, z: 10, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: -10, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: 15, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: -15, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: -20, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: 20, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: -25, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: 25, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: -5, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: 5, s: 1.5 }));
  world.add(new GrTrees({ x: -25, z: 0, s: 1.5 }));

  //carousel
  world.add(new GrCarousel({ x: 23, y:0,z: -19, size: 1.5 }));

  //snow in the world
  world.add(new GrSnow());
 

  //construction objects
  world.add(new ShinySculpture(world));
  world.add(new MorphTest({ x: 10, y: 3, r: 2 }));

  world.add(new GrBall());
  let forklift = new ForkLift({x:24,z:23,size:1});
  world.add(forklift);
  
  let gantry_crane = new GantryCrane({x:15,z:23});
  world.add(gantry_crane);
  let gc_ui = new AutoUI(gantry_crane);

  world.add(new GrMud)
  
  // build and run the UI

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
