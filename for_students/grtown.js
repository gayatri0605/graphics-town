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

import { CircularTrack, TrackCube, TrackCar } from "../examples/track.js";
import { ShinySculpture } from "../examples/shinySculpture.js";
import { MorphTest } from "../examples/morph.js";
import { GrTrees, GrSnow, GrHelipad, GrCarousel, GrAirplane1, GrAirplane2, GrBall, GrTrack } from "./myObj.js";
import {GrBuilding1,GrBuilding2,GrBuilding3} from "../for_students/house.js"




function grtown() {
  // make the world
  let world = new GrWorld({
    width: 1500,
    height: 950,
    groundplanesize: 35, // make the ground plane big enough for a world of stuff
    groundplanecolor: "#522F04"
  })
   

  //TO-DO
  let loader = new T.CubeTextureLoader();
  loader.setPath('./textures/');
  let envTexture = loader.load([
    "skyLeft.jpg", "skyRight.jpg",
    "skyTop.jpg", "skyBottom.jpg",
    "skyFront.jpg", "skyBack.jpg"
  ]);
  world.scene.background = envTexture;

  let grassTexture = new T.TextureLoader().load( './Examples/grass.jpg' );
  grassTexture.wrapS = grassTexture.wrapT = T.RepeatWrapping; 
  let customUniforms = {
		
		grassTexture:	{ type: "t", value: grassTexture },
      side: T.DoubleSide
  };
  
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
        world.add(new GrBuilding1({x:building_indx*7 - 2,z: -31, size:2.6, rotate:0}));
    }

  /** 
  for (let i = -19; i < 20; i += 5) {
    world.add(new SimpleHouse({ x: i, z: -12 }));
    world.add(new SimpleHouse({ x: i, z: 12 }));
  }
  */

  /** Race Track - with three things racing around */
  let track = new GrTrack();
  let tc1 = new TrackCube(track);
  let tc2 = new TrackCube(track);
  let tc3 = new TrackCar(track);

  // place things are different points on the track
  tc2.u = 0.25;
  tc3.u = 0.125;
  // and make sure they are in the world
  world.add(track);
  world.add(tc1);
  world.add(tc2);
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
  world.add(new GrCarousel({ x: 23, y:0,z: 19, size: 1.5 }));

  //snow in the world
  world.add(new GrSnow());

  // these are testing objects
  world.add(new ShinySculpture(world));
  world.add(new MorphTest({ x: 10, y: 3, r: 2 }));

  world.add(new GrBall());


  // build and run the UI

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
