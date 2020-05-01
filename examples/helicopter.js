/*jshint esversion: 6 */

// @ts-check

/**
 * Simple example for GraphicsTown - Helicopter
 *
 * Define Helipads (places for the helicopter to land)
 * After making the helicopter, use "getPads" to have it identify them
 * It is meant to have just 1 helicopter
 *
 * This is based on an older version - it tries to keep the quaint look
 *
 * The code is thrown together quickly - beware, it's ugly
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// keep the helipad geometry global so we can re-use it
// variables are initialized to undefined by default
// (and its a warning to explicitly set them that way)
let helipadCount = 0;
let helipadMaterial;
let helipadGeometry;

export class Helipad extends GrObject {
  /**
   * Make a place for a helicopter to land
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  constructor(x, y, z) {
    if (!helipadGeometry) {
      // make the helipad geometry as a global - if it's not there
      const q = 0.25;
      const h = 0.5;
      // make the normals point upwards - no matter what orientation the triangle has
      const up = new T.Vector3(0, -1, 0);
      const padcoords = [
        -1,
        0,
        -1,
        -1,
        0,
        1,
        -h,
        0,
        1,
        -h,
        0,
        -1,
        1,
        0,
        -1,
        1,
        0,
        1,
        h,
        0,
        1,
        h,
        0,
        -1,
        -h,
        0,
        -q,
        -h,
        0,
        q,
        h,
        0,
        q,
        h,
        0,
        -q,
      ];
      const padidx = [2, 1, 0, 3, 2, 0, 4, 5, 6, 4, 6, 7, 10, 9, 8, 10, 8, 11];
      helipadGeometry = new T.Geometry();
      for (let i = 0; i < padcoords.length; i += 3) {
        helipadGeometry.vertices.push(
          new T.Vector3(padcoords[i], padcoords[i + 1], padcoords[i + 2])
        );
      }
      for (let i = 0; i < padidx.length; i += 3) {
        helipadGeometry.faces.push(
          new T.Face3(padidx[i], padidx[i + 1], padidx[i + 2], up)
        );
      }
    }
    if (!helipadMaterial) {
      helipadMaterial = new T.MeshLambertMaterial({
        color: "#FFFF00",
        side: T.DoubleSide,
      });
    }
    let mesh = new T.Mesh(helipadGeometry, helipadMaterial);

    super(`Helipad-${++helipadCount}`, mesh);
    mesh.position.x = x ? x : 0;
    mesh.position.y = (y ? y : 0) + 0.01;
    mesh.position.z = z ? z : 0;
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    this.mesh = mesh;
    this.objects.push(mesh);
  }
}

let helicopterCount = 0;
export class Helicopter extends GrObject {
  /**
   * Simple looking helicopter - with a complex behavior
   *
   * @param {Object} params
   */
  constructor(params = {}) {
    let group = new T.Group();
   super(`Helicopter-${helicopterCount}`, group);
    let material = new T.MeshStandardMaterial({
      color: "#88CC22",
      side: T.DoubleSide,
    });
    

    //this.helicopter = group;

    //let worldGroup = new T.Group();

    // then create a quadcopter group on the inside of this worldGroup
    
    let quadCopterGroup = new T.Group();
   // worldGroup.add(quadCopterGroup);

    let sideLen = 5;
    let hLenDiag = 3;
    let vLenDiag = 4;

    // creates the body shape
    let bodyShape = new T.Shape();   
    bodyShape.moveTo(-(hLenDiag + (sideLen / 2)), -(sideLen/2) );
    bodyShape.lineTo(-(hLenDiag + (sideLen / 2)), sideLen/2);
    bodyShape.lineTo(-(sideLen / 2), (sideLen / 2) + vLenDiag);
    bodyShape.lineTo(sideLen/2, (sideLen / 2) + vLenDiag);
    bodyShape.lineTo((hLenDiag + (sideLen / 2)), sideLen/2);
    bodyShape.lineTo((hLenDiag + (sideLen / 2)), -(sideLen / 2));
    bodyShape.lineTo(sideLen/2, -((sideLen/2) + vLenDiag));
    bodyShape.lineTo(-(sideLen/2), -((sideLen/2) + vLenDiag));
    bodyShape.lineTo(-(hLenDiag + (sideLen / 2)), -(sideLen/2) );

    let bodyExtrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: false
    };

    // body geometry, material and mesh
    let geometry = new T.ExtrudeGeometry( bodyShape, bodyExtrudeSettings );
    //let material = new T.MeshStandardMaterial( { color: 0x25a006, emissive: 0x00ff00, emissiveIntensity:0.5, roughness:0.75, metalness:1.0  } );
    let bodyMesh = new T.Mesh( geometry, material ) ;

    bodyMesh.rotateX(Math.PI / 2);
    bodyMesh.scale.set(0.1, 0.1, 0.1);

    // FRONT OF COPTER AND RADAR
    let frontGeom = new T.ConeGeometry(0.1, 0.3);
    let frontMaterial = new T.MeshStandardMaterial({color:"red"});

    let frontMesh = new T.Mesh(frontGeom, frontMaterial);

    frontMesh.rotateZ(Math.PI/2);
    frontMesh.position.set(-0.69, -0.1, 0);

    // ARMS
    let armGroup = new T.Group();
    armGroup.rotateY(Math.PI/4);

    let armX = 3;   // arm width
    let armY = 10;  // arm length

    // shape of the arm to draw
    let armShape = new T.Shape();
    armShape.moveTo(-armX/2,-armY/2);
    armShape.lineTo(armX/2, -armY/2);
    armShape.lineTo(armX/2, armY/2);
    armShape.lineTo(-armX/2, armY/2);
    armShape.lineTo(-armX/2, -armY/2);

    let armExtrudeSettings = {
        steps:2,
        depth:2.75,
        bevelEnabled: true,
        bevelThickness: 0.5,
	    bevelSize: 0.5,
	    bevelSegments: 3
    };


    let armGeom = new T.ExtrudeGeometry(armShape, armExtrudeSettings);
    let armMaterial = new T.MeshStandardMaterial( {color: 0x6aad69, roughness:0.75, metalness:1.0 });
    
    
    let arms = [];
    for(let i = 0; i < 4; i++) {

        let currentArm = new T.Mesh(armGeom, armMaterial);
        currentArm.scale.set(0.05, 0.05, 0.05);

        if (i ==0 || i == 1) {
            currentArm.rotateX(Math.PI/2);
            currentArm.rotateZ(-Math.PI/25);
        } else {
            currentArm.rotateZ(Math.PI/2);
            currentArm.rotateX(-Math.PI/25);
        }

        arms.push(currentArm);
        armGroup.add(currentArm);

    }

    arms[0].position.set(-0.01, -0.03, 0.8);
    arms[1].position.set(0.01, -0.03, -0.8);
    arms[2].position.set(-0.8, -0.105, -0.06);
    arms[3].position.set(0.8, -0.105, -0.08);

    // BLADES
    let bladeBottomLeftGroup = new T.Group();
    let bladeBottomRightGroup = new T.Group();
    let bladeTopLeftGroup = new T.Group();
    let bladeTopRightGroup = new T.Group();

    
    armGroup.add(bladeBottomLeftGroup);
    armGroup.add(bladeBottomRightGroup);
    armGroup.add(bladeTopLeftGroup);
    armGroup.add(bladeTopRightGroup);

    
    bladeBottomLeftGroup.position.set(0.015, 0.04, 0.97);
    bladeBottomRightGroup.position.set(0.97, 0.04, 0.01);
    bladeTopLeftGroup.position.set(-0.97, 0.04, -0.01);
    bladeTopRightGroup.position.set(-0.015, 0.04, -0.97);

   
    let bladePegGeom = new T.CylinderGeometry(0.04, 0.06, 0.1);
    let bladePegMaterial = new T.MeshStandardMaterial({color: 0xddf2a9});

    let bladePegBotLeftMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegBotRightMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegTopLeftMesh = new T.Mesh(bladePegGeom, bladePegMaterial);
    let bladePegTopRightMesh = new T.Mesh(bladePegGeom, bladePegMaterial);

    
    bladeBottomLeftGroup.add(bladePegBotLeftMesh);
    bladeBottomRightGroup.add(bladePegBotRightMesh);
    bladeTopLeftGroup.add(bladePegTopLeftMesh);
    bladeTopRightGroup.add(bladePegTopRightMesh);

    
    let bladeOuterGeom = new T.TorusGeometry(0.2, 0.05, 24, 18);
    let bladeOuterMaterial = new T.MeshStandardMaterial({color: 0x8c0c08});

    
    let bladeInnerGeom = new T.ConeGeometry(0.05,0.22, 16);
    let bladeInnerMaterial = new T.MeshStandardMaterial({color:0xe2211b});

    
    let bladesOuter = [];
    let bladesInner = [];
    for (let bladeNum = 0; bladeNum < 4; bladeNum++) {

        let currentOuterBlade = new T.Mesh(bladeOuterGeom, bladeOuterMaterial);
        let innerBlade1 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade2 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade3 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);
        let innerBlade4 = new T.Mesh(bladeInnerGeom, bladeInnerMaterial);

        currentOuterBlade.position.y = 0.03;
        currentOuterBlade.rotation.x = Math.PI/2;

        innerBlade1.position.set(0, 0.04, 0.11);
        innerBlade1.rotation.x = Math.PI / 2;

        innerBlade2.scale.setY(-1);
        innerBlade2.position.set(0, 0.04, -0.11);
        innerBlade2.rotation.x = Math.PI / 2;

        innerBlade3.scale.setY(-1);
        innerBlade3.position.set(0.11, 0.04, 0);
        innerBlade3.rotation.z = Math.PI / 2;

        innerBlade4.position.set(-0.11, 0.04, 0);
        innerBlade4.rotation.z = Math.PI / 2;

        bladesOuter.push(currentOuterBlade);
        bladesInner.push(innerBlade1);
        bladesInner.push(innerBlade2);
        bladesInner.push(innerBlade3);
        bladesInner.push(innerBlade4);

    }

    // add outer blades to the individual blade groups
    bladeBottomLeftGroup.add(bladesOuter[0]);
    bladeBottomRightGroup.add(bladesOuter[1]);
    bladeTopLeftGroup.add(bladesOuter[2]);
    bladeTopRightGroup.add(bladesOuter[3]);

    // add inner blades to the individual blade groups
    bladeBottomLeftGroup.add(bladesInner[0]);
    bladeBottomLeftGroup.add(bladesInner[1]);
    bladeBottomLeftGroup.add(bladesInner[2]);
    bladeBottomLeftGroup.add(bladesInner[3]);

    bladeBottomRightGroup.add(bladesInner[4]);
    bladeBottomRightGroup.add(bladesInner[5]);
    bladeBottomRightGroup.add(bladesInner[6]);
    bladeBottomRightGroup.add(bladesInner[7]);

    bladeTopLeftGroup.add(bladesInner[8]);
    bladeTopLeftGroup.add(bladesInner[9]);
    bladeTopLeftGroup.add(bladesInner[10]);
    bladeTopLeftGroup.add(bladesInner[11]);

    bladeTopRightGroup.add(bladesInner[12]);
    bladeTopRightGroup.add(bladesInner[13]);
    bladeTopRightGroup.add(bladesInner[14]);
    bladeTopRightGroup.add(bladesInner[15]);

    // moves the quadCopterGroup to a default location and adds its other groups
    quadCopterGroup.position.set(0, 2, 3);
    quadCopterGroup.add(bodyMesh);
    quadCopterGroup.add(frontMesh);
    quadCopterGroup.add(armGroup);
  }
}
