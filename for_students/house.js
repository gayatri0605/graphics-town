

/*jshint esversion: 6 */
// @ts-check

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T


import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-THREE/examples/jsm/loaders/OBJLoader.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";



let yellow = 1; let blue = 1; let brown = 1; let lighthousenum = 1;

export class GrBuilding1 extends GrObject {
  constructor(params = {}) {
    var normal = new T.Vector3( 0, 0, 0 ); //optional
    var color = new T.Color( 0x0A1290 ); //optional
    let geometry = new T.Geometry();
    let width = 2, height = 1;
    geometry.vertices.push(new T.Vector3(0, 0, 0));//0
    geometry.vertices.push(new T.Vector3(width, 0, 0));//1
    geometry.vertices.push(new T.Vector3(width, 0, width));//2
    geometry.vertices.push(new T.Vector3(0, 0, width));//3
    geometry.vertices.push(new T.Vector3(0, height, width));//4
    geometry.vertices.push(new T.Vector3(0, height, 0));//5
    geometry.vertices.push(new T.Vector3(width, height, 0));//6
    geometry.vertices.push(new T.Vector3(width, height, width));//7
    geometry.vertices.push(new T.Vector3(width, height * 1.5, width / 2));//8
    geometry.vertices.push(new T.Vector3(0, height * 1.5, width / 2));//9
    //window
    height = height - 0.5, width = width + 0.01;
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5, width));//10
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5, width));//11
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5 + 1.5 * width / 6, width));//12
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5 + 1.5 * width / 6, width));//13
    //door
    height = height;
    let door_width = 0.4, width2 = width - 0.3;
    geometry.vertices.push(new T.Vector3(width2 - door_width, 0, width));//14
    geometry.vertices.push(new T.Vector3(width2, 0, width));//15
    geometry.vertices.push(new T.Vector3(width2, door_width * 2, width));//16
    geometry.vertices.push(new T.Vector3(width2 - door_width, door_width * 2, width));//17

    //
    geometry.faceVertexUvs = [[]];
    let f1 = new T.Face3(3, 2, 7,normal, color);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f2 = new T.Face3(3, 7, 4,normal, color);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f3 = new T.Face3(2, 1, 6,normal, color);
    geometry.faces.push(f3);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 1 / 3), new T.Vector2(1, 2 / 3)]);
    let f4 = new T.Face3(2, 6, 7,normal, color);
    geometry.faces.push(f4);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 2 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f5 = new T.Face3(4, 7, 6,normal, color);
    geometry.faces.push(f5);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(2 / 3, 1)]);
    let f6 = new T.Face3(4, 6, 5,normal, color);
    geometry.faces.push(f6);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 1), new T.Vector2(1 / 3, 1)]);
    let f7 = new T.Face3(0, 3, 4,normal, color);
    geometry.faces.push(f7);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 1 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f8 = new T.Face3(0, 4, 5,normal, color);
    geometry.faces.push(f8);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 2 / 3), new T.Vector2(0, 2 / 3)]);
    let f9 = new T.Face3(0, 1, 2,normal, color);
    geometry.faces.push(f9);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 0), new T.Vector2(2 / 3, 1 / 3)]);
    let f10 = new T.Face3(0, 2, 3,normal, color);
    geometry.faces.push(f10);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1 / 3, 1 / 3)]);

    let f11 = new T.Face3(1, 0, 5,normal, color);
    geometry.faces.push(f11);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 0), new T.Vector2(1, 1 / 3)]);
    let f12 = new T.Face3(1, 5, 6,normal, color);
    geometry.faces.push(f12);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 1 / 3), new T.Vector2(2 / 3, 1 / 3)]);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    let tl = new T.TextureLoader().load("./textures/wall.jpg");
    let material = new T.MeshStandardMaterial({ map: tl });

    //roof
    let f21 = new T.Face3(4, 7, 8,normal,color);
    f21.materialIndex = 1;
    geometry.faces.push(f21);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1 / 4, 0), new T.Vector2(1 / 4, 1 / 4)]);
    let f22 = new T.Face3(4, 8, 9,normal,color);
    f22.materialIndex = 1;
    geometry.faces.push(f22);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1 / 4, 1 / 4), new T.Vector2(0, 1 / 4)]);
    let f23 = new T.Face3(6, 5, 9,normal,color);
    f23.materialIndex = 1;
    geometry.faces.push(f23);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f24 = new T.Face3(6, 9, 8,normal,color);
    f24.materialIndex = 1;
    geometry.faces.push(f24);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);
    let f25 = new T.Face3(9, 5, 4,normal,color);
    f25.materialIndex = 1;
    geometry.faces.push(f25);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f26 = new T.Face3(8, 7, 6,normal,color);
    f26.materialIndex = 1;
    geometry.faces.push(f26);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    //window
    let f33 = new T.Face3(10, 11, 12,normal, color);
    f33.materialIndex = 2;
    geometry.faces.push(f33);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f34 = new T.Face3(10, 12, 13,normal, color);
    f34.materialIndex = 2;
    geometry.faces.push(f34);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    //door
    let f43 = new T.Face3(14, 15, 16,normal, color);
    f43.materialIndex = 3;
    geometry.faces.push(f43);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f44 = new T.Face3(14, 16, 17,normal, color);
    f44.materialIndex = 3;
    geometry.faces.push(f44);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    let t2 = new T.TextureLoader().load("./textures/roof2.jpg");
    let material2 = new T.MeshStandardMaterial({ map: t2 });
    let t3 = new T.TextureLoader().load("./textures/window2.jpg");
    let material3 = new T.MeshStandardMaterial({ map: t3 });
    let t4 = new T.TextureLoader().load("./textures/door.jpeg");
    let material4 = new T.MeshStandardMaterial({ map: t4 });
    let mesh = new T.Mesh(geometry, [material, material2, material3, material4]);

    super(`Yellow House-${yellow++}`, mesh);
    this.whole_ob = mesh;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    this.whole_ob.scale.set(scale, scale, scale);

    this.rotate = params.rotate ? Number(params.rotate) : 0;
    switch (this.rotate) {
      case 0:
        break;
      case 1:
        mesh.rotation.y = Math.PI / 2;
        break;
      case 2:
        mesh.rotation.y = -Math.PI / 2;
        break;
    }
  }
}

export class GrBuilding2 extends GrObject {
  constructor(params = {}) {
    var normal = new T.Vector3( 0, 0, 0 ); //optional
    var color = new T.Color( 0x0A1290 ); //optional
    let geometry = new T.Geometry();
    let width = 2, height = 1;
    geometry.vertices.push(new T.Vector3(0, 0, 0));//0
    geometry.vertices.push(new T.Vector3(width, 0, 0));//1
    geometry.vertices.push(new T.Vector3(width, 0, width));//2
    geometry.vertices.push(new T.Vector3(0, 0, width));//3
    geometry.vertices.push(new T.Vector3(0, height, width));//4
    geometry.vertices.push(new T.Vector3(0, height, 0));//5
    geometry.vertices.push(new T.Vector3(width, height, 0));//6
    geometry.vertices.push(new T.Vector3(width, height, width));//7
    //roof
    geometry.vertices.push(new T.Vector3(width / 2, height * 1.8, width / 2));//8
    //window
    height = height - 0.5, width = width + 0.01;
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5 - 0.1, width));//9
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5 - 0.1, width));//10
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5 + 1.5 * width / 6 + 0.1, width));//11
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5 + 1.5 * width / 6 + 0.1, width));//12
    //door
    height = height;
    let door_width = 0.4, width2 = width - 0.3;
    geometry.vertices.push(new T.Vector3(width2 - door_width, 0, width));//13
    geometry.vertices.push(new T.Vector3(width2, 0, width));//14
    geometry.vertices.push(new T.Vector3(width2, door_width * 2, width));//15
    geometry.vertices.push(new T.Vector3(width2 - door_width, door_width * 2, width));//16

    //
    geometry.faceVertexUvs = [[]];
    let f1 = new T.Face3(3, 2, 7,normal,color);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f2 = new T.Face3(3, 7, 4,normal,color);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f3 = new T.Face3(2, 1, 6);
    geometry.faces.push(f3);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 1 / 3), new T.Vector2(1, 2 / 3)]);
    let f4 = new T.Face3(2, 6, 7);
    geometry.faces.push(f4);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 2 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f5 = new T.Face3(4, 7, 6);
    geometry.faces.push(f5);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(2 / 3, 1)]);
    let f6 = new T.Face3(4, 6, 5);
    geometry.faces.push(f6);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 1), new T.Vector2(1 / 3, 1)]);
    let f7 = new T.Face3(0, 3, 4);
    geometry.faces.push(f7);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 1 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f8 = new T.Face3(0, 4, 5);
    geometry.faces.push(f8);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 2 / 3), new T.Vector2(0, 2 / 3)]);
    let f9 = new T.Face3(0, 1, 2);
    geometry.faces.push(f9);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 0), new T.Vector2(2 / 3, 1 / 3)]);
    let f10 = new T.Face3(0, 2, 3);
    geometry.faces.push(f10);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1 / 3, 1 / 3)]);

    let f11 = new T.Face3(1, 0, 5);
    geometry.faces.push(f11);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 0), new T.Vector2(1, 1 / 3)]);
    let f12 = new T.Face3(1, 5, 6);
    geometry.faces.push(f12);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 1 / 3), new T.Vector2(2 / 3, 1 / 3)]);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //

    let tl = new T.TextureLoader().load("./textures/wall.jpg");
    let material = new T.MeshStandardMaterial({ map: tl });

    //roof
    let f21 = new T.Face3(4, 7, 8,normal,color);
    f21.materialIndex = 1;
    geometry.faces.push(f21);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f22 = new T.Face3(7, 6, 8,normal,color);
    f22.materialIndex = 1;
    geometry.faces.push(f22);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);
    let f23 = new T.Face3(6, 5, 8,normal,color);
    f23.materialIndex = 1;
    geometry.faces.push(f23);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f24 = new T.Face3(4, 8, 5,normal,color);
    f24.materialIndex = 1;
    geometry.faces.push(f24);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);
    //window
    let f33 = new T.Face3(9, 10, 11,normal,color);
    f33.materialIndex = 2;
    geometry.faces.push(f33);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f34 = new T.Face3(9, 11, 12,normal,color);
    f34.materialIndex = 2;
    geometry.faces.push(f34);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    //door
    let f43 = new T.Face3(13, 14, 15);
    f43.materialIndex = 3;
    geometry.faces.push(f43);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f44 = new T.Face3(13, 15, 16);
    f44.materialIndex = 3;
    geometry.faces.push(f44);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    let t2 = new T.TextureLoader().load("./textures/roof2.jpg");
    let material2 = new T.MeshStandardMaterial({ map: t2 });
    let t3 = new T.TextureLoader().load("./textures/window2.jpg");
    let material3 = new T.MeshStandardMaterial({ map: t3 });
    let t4 = new T.TextureLoader().load("./textures/door.jpeg");
    let material4 = new T.MeshStandardMaterial({ map: t4 });
    let mesh = new T.Mesh(geometry, [material, material2, material3, material4]);

    super(`Blue House-${blue++}`, mesh);
    this.whole_ob = mesh;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    mesh.scale.set(scale, scale, scale);
    this.rotate = params.rotate ? Number(params.rotate) : 0;
    switch (this.rotate) {
      case 0:
        break;
      case 1:
        mesh.rotation.y = Math.PI / 2;
        break;
      case 2:
        mesh.rotation.y = -Math.PI / 2;
        break;
    }
  }
}

export class GrBuilding3 extends GrObject {
  constructor(params = {}) {
    var normal = new T.Vector3( 0, 0, 0 ); //optional
    var color = new T.Color( 0x0A1290 ); //optional
    let building = new T.Group();
    let geometry = new T.Geometry();
    let width = 2, height = 1;
    geometry.vertices.push(new T.Vector3(0, 0, 0));//0
    geometry.vertices.push(new T.Vector3(width, 0, 0));//1
    geometry.vertices.push(new T.Vector3(width, 0, width));//2
    geometry.vertices.push(new T.Vector3(0, 0, width));//3
    geometry.vertices.push(new T.Vector3(0, height, width));//4
    geometry.vertices.push(new T.Vector3(0, height, 0));//5
    geometry.vertices.push(new T.Vector3(width, height, 0));//6
    geometry.vertices.push(new T.Vector3(width, height, width));//7
    geometry.vertices.push(new T.Vector3(width, height * 1.5, width / 2));//8
    geometry.vertices.push(new T.Vector3(0, height * 1.5, width / 2));//9
    //window
    height = height - 0.5, width = width + 0.01;
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5, width));//10
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5, width));//11
    geometry.vertices.push(new T.Vector3(1.2 * width * 2 / 3 - 0.5, height / 1.5 + 1.5 * width / 6, width));//12
    geometry.vertices.push(new T.Vector3(1.2 * width / 3 - 0.5, height / 1.5 + 1.5 * width / 6, width));//13
    //door
    height = height;
    let door_width = 0.4, width2 = width - 0.3;
    geometry.vertices.push(new T.Vector3(width2 - door_width, 0, width));//14
    geometry.vertices.push(new T.Vector3(width2, 0, width));//15
    geometry.vertices.push(new T.Vector3(width2, door_width * 2, width));//16
    geometry.vertices.push(new T.Vector3(width2 - door_width, door_width * 2, width));//17

    //
    geometry.faceVertexUvs = [[]];
    let f1 = new T.Face3(3, 2, 7);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f2 = new T.Face3(3, 7, 4);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 1 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f3 = new T.Face3(2, 1, 6);
    geometry.faces.push(f3);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 1 / 3), new T.Vector2(1, 2 / 3)]);
    let f4 = new T.Face3(2, 6, 7);
    geometry.faces.push(f4);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1, 2 / 3), new T.Vector2(2 / 3, 2 / 3)]);
    let f5 = new T.Face3(4, 7, 6);
    geometry.faces.push(f5);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 2 / 3), new T.Vector2(2 / 3, 1)]);
    let f6 = new T.Face3(4, 6, 5);
    geometry.faces.push(f6);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 2 / 3), new T.Vector2(2 / 3, 1), new T.Vector2(1 / 3, 1)]);
    let f7 = new T.Face3(0, 3, 4);
    geometry.faces.push(f7);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 1 / 3), new T.Vector2(1 / 3, 2 / 3)]);
    let f8 = new T.Face3(0, 4, 5);
    geometry.faces.push(f8);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 1 / 3), new T.Vector2(1 / 3, 2 / 3), new T.Vector2(0, 2 / 3)]);
    let f9 = new T.Face3(0, 1, 2);
    geometry.faces.push(f9);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 0), new T.Vector2(2 / 3, 1 / 3)]);
    let f10 = new T.Face3(0, 2, 3);
    geometry.faces.push(f10);
    geometry.faceVertexUvs[0].push([new T.Vector2(1 / 3, 0), new T.Vector2(2 / 3, 1 / 3), new T.Vector2(1 / 3, 1 / 3)]);

    let f11 = new T.Face3(1, 0, 5);
    geometry.faces.push(f11);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 0), new T.Vector2(1, 1 / 3)]);
    let f12 = new T.Face3(1, 5, 6);
    geometry.faces.push(f12);
    geometry.faceVertexUvs[0].push([new T.Vector2(2 / 3, 0), new T.Vector2(1, 1 / 3), new T.Vector2(2 / 3, 1 / 3)]);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //

    let tl = new T.TextureLoader().load("./textures/wall.jpg");
    let material = new T.MeshStandardMaterial({ map: tl });

    //roof
    let f21 = new T.Face3(4, 7, 8,normal,color);
    f21.materialIndex = 1;
    geometry.faces.push(f21);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1 / 4, 0), new T.Vector2(1 / 4, 1 / 4)]);
    let f22 = new T.Face3(4, 8, 9,normal,color);
    f22.materialIndex = 1;
    geometry.faces.push(f22);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1 / 4, 1 / 4), new T.Vector2(0, 1 / 4)]);
    let f23 = new T.Face3(6, 5, 9,normal,color);
    f23.materialIndex = 1;
    geometry.faces.push(f23);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f24 = new T.Face3(6, 9, 8,normal,color);
    f24.materialIndex = 1;
    geometry.faces.push(f24);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);
    let f25 = new T.Face3(9, 5, 4,normal,color);
    f25.materialIndex = 1;
    geometry.faces.push(f25);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f26 = new T.Face3(8, 7, 6,normal,color);
    f26.materialIndex = 1;
    geometry.faces.push(f26);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    //window
    let f33 = new T.Face3(10, 11, 12,normal,color);
    f33.materialIndex = 2;
    geometry.faces.push(f33);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f34 = new T.Face3(10, 12, 13,normal,color);
    f34.materialIndex = 2;
    geometry.faces.push(f34);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    //door
    let f43 = new T.Face3(14, 15, 16,normal,color);
    f43.materialIndex = 3;
    geometry.faces.push(f43);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 0), new T.Vector2(1, 1)]);
    let f44 = new T.Face3(14, 16, 17,normal,color);
    f44.materialIndex = 3;
    geometry.faces.push(f44);
    geometry.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(1, 1), new T.Vector2(0, 1)]);

    let t2 = new T.TextureLoader().load("./textures/roof2.jpg");
    let material2 = new T.MeshStandardMaterial({ map:t2 });
    let t3 = new T.TextureLoader().load("./textures/window2.jpg");
    let material3 = new T.MeshStandardMaterial({ map: t3 });
    let t4 = new T.TextureLoader().load("./textures/door.jpeg");
    let material4 = new T.MeshStandardMaterial({ map: t4 });
    let mesh = new T.Mesh(geometry, [material, material2, material3, material4]);

    let chimney_geom = new T.BoxGeometry(0.3, 1, 0.3);
    let chimney_mat = new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 });
    let chimney = new T.Mesh(chimney_geom, chimney_mat);

    chimney.translateY(1.4);
    chimney.translateZ(1.3);
    chimney.translateX(0.5);
    building.add(mesh, chimney);
    super(`Brown House-${brown++}`, building);
    this.whole_ob = building;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    building.scale.set(scale, scale, scale);
    this.rotate = params.rotate ? Number(params.rotate) : 0;
    switch (this.rotate) {
      case 0:
        break;
      case 1:
        building.rotation.y = Math.PI / 2;
        break;
      case 2:
        building.rotation.y = -Math.PI / 2;
        break;
      case 3:
        building.rotation.y = Math.PI;
        break;
    }
  }
}



export class GrBuilding4 extends Loaders.ObjGrObject {
    constructor(light){
      super({
        let lighthouse = new Loaders.ObjGrObject({
          obj:"../objects/lighthouse.obj",
          mtl:"./objects/Blank.mtl",
          mtloptions: {side:T.DoubleSide},
          callback: function (obj) {
              console.log(obj);
              obj.objects.forEach(ob => console.log(ob));
            }
          })
        });
    
				lighthouse.position.set(0, 3.5, 0);
				lighthouse.scale.set(0.2,0.2,0.2);
				building.add(lighthouse);
				lighthouse.translateY(1.0);

				lighthouse.traverse(function(child) {
					if (child instanceof T.Mesh) {
					  child.material = horse_mat;
          }
        super(`Lighthouse-${lighthousenum++}`,building);
        this.whole_ob = building;
        building.rotateX(-Math.PI/2);
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
		    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        building.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0:
                break;
            case 1:
                building.rotation.y = Math.PI/2;
                break;
            case 2:
                building.rotation.y = -Math.PI/2;
                break;
            case 3:
                building.rotation.y = Math.PI;
                break;
        }

      

