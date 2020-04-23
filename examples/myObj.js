/*jshint esversion: 6 */
// @ts-check


import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let Colors = {
    brown: 0x6D4C41,
    lightGreen: 0x9CCC65,
    darkGreen: 0x689F38,
    yellow: 0xFDD835
};

let GrTreeNum = 0;
export class GrTrees extends GrObject {
    constructor(params = {})
    {
       
        let tree = new T.Group();
        let treeGeo = new T.BoxGeometry(1, 1, 1);
        let leafTexture = new T.TextureLoader().load("../for_students/textures/Leaf-Texture.jpg");
        let leafMat = new T.MeshStandardMaterial({map: leafTexture, normalMap: leafTexture});
        let trunkMat = new T.MeshLambertMaterial({color: Colors.brown});
        let trunk = new T.Mesh(treeGeo, trunkMat);
        trunk.position.set(0, 0, 0);
        trunk.scale.set(0.8, 3, 0.8);
        tree.add(trunk);

        let leafL1 = new T.Mesh(treeGeo, leafMat);
        leafL1.position.set(0, 1.4, 0);
        leafL1.scale.set(4, .4, 2);
        tree.add(leafL1);

        let leafL2 = new T.Mesh(treeGeo, leafMat);
        leafL2.position.set(0, 1.8, 0);
        leafL2.scale.set(3.5, .4, 2);
        tree.add(leafL2);

        let leafL3 = new T.Mesh(treeGeo, leafMat);
        leafL3.position.set(0, 2.2, 0);
        leafL3.scale.set(3, .4, 2);
        tree.add(leafL3);

        let leafL4 = new T.Mesh(treeGeo, leafMat);
        leafL4.position.set(0, 2.6, 0);
        leafL4.scale.set(2.5, .4, 2);
        tree.add(leafL4);
        
        let leafL5 = new T.Mesh(treeGeo, leafMat);
        leafL5.position.set(0, 3, 0);
        leafL5.scale.set(2, .4, 2);
        tree.add(leafL5);

        let leafL6 = new T.Mesh(treeGeo, leafMat);
        leafL6.position.set(0, 3.4, 0);
        leafL6.scale.set(1.5, .4, 2);
        tree.add(leafL6);

        let leafL7 = new T.Mesh(treeGeo, leafMat);
        leafL7.position.set(0, 3.4, 0);
        leafL7.scale.set(1, .4, 2);
        tree.add(leafL7);

        let leafL8 = new T.Mesh(treeGeo, leafMat);
        leafL8.position.set(0, 3.8, 0);
        leafL8.scale.set(.5, .4, 2);
        tree.add(leafL8);

        tree.translateY(1.5);
        tree.rotateY(Math.PI / 2);
        tree.position.x = params.x || 0;
        tree.position.z = params.z || 0;
        let s = params.s || 1;
        tree.scale.set(s, s, s);
        tree.translateY(0.6);
        super(`tree-${++GrTreeNum}`, tree);
        this.tree = tree;
    }
}
    
export class GrSnow extends GrObject
{
    constructor()
    {
        let drops = 20000;
        let dropTex = new T.TextureLoader().load("./Textures/drop1.png");
        let dropMat = new T.PointsMaterial({
            color: "white",
            size: 1.0,
            map: dropTex,
            blending: T.AdditiveBlending,
            transparent: true,
        });
        let dropGeo = new T.Geometry();
        for (let i = 0; i < drops; i++)
        {
            let drx = Math.random() * 250 - 100,
                dry = Math.random() * 250 - 100,
                drz = Math.random() * 250 - 100,
                drop = new T.Vector3(drx, dry, drz);
            dropGeo.vertices.push(drop);
        }
        let rain = new T.Points(dropGeo, dropMat);
        super(`rain`, rain);
        let speed = Math.random() * 0.1;
        this.advance = function(delta, timeOfDay)
        {
            rain.rotation.y += 0.00007 * delta;
            let drc = drops;
            while(drc--)
            {
                let drop = dropGeo.vertices[drc];
                if (drop.y < -100)
                {
                    drop.y = 200;
                }
                drop.y -= speed;
            }
            if (drc === 0) drc = drops;
            dropGeo.verticesNeedUpdate = true;
        }
    }

}