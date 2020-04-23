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
import {GrObject } from "../libs/CS559-Framework/GrObject.js";  // only for typing
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { SimpleHouse } from "../examples/house.js";
import { CircularTrack, TrackCube, TrackCar } from "../examples/track.js";
import { Helicopter, Helipad } from "../examples/helicopter.js";
import { ShinySculpture } from "../examples/shinySculpture.js";
import { MorphTest } from "../examples/morph.js";
//import { GrTrees } from "../examples/myObj.js";




function grtown() {
  // make the world
  let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 30 // make the ground plane big enough for a world of stuff
  });

  // put stuff into the world
  
  for (let i = -19; i < 20; i += 5) {
    world.add(new SimpleHouse({ x: i, z: -12 }));
    world.add(new SimpleHouse({ x: i, z: 12 }));
  }

  /** Race Track - with three things racing around */
  let track = new CircularTrack();
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
  world.add(new Helipad(-15, 0, 0));
  world.add(new Helipad(15, 0, 0));
  world.add(new Helipad(0, 0, -17));
  world.add(new Helipad(0, 0, 17));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  //trees
  //world.add(new GrTrees({x: -25, z: 10, s: 1.5}));
  //world.add(new GrTrees({x: -25, z:-10, s: 1.5}));

  // these are testing objects
  world.add(new ShinySculpture(world));
  world.add(new MorphTest({ x: 10, y: 3, r: 2 }));

  

  // build and run the UI

  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
