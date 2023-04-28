import { Util } from "../libs/util";
import { MyObject3D } from "../webgl/myObject3D";
import { Face } from './face';
import { Color } from 'three/src/math/Color';
import { Vector3 } from 'three/src/math/Vector3';

export class Box extends MyObject3D {

  private _id: number;
  private _face: Array<Face> = [];
  private _size: Vector3 = new Vector3();

  constructor(id: number) {
    super();

    this._id = id;

    for(let i = 0; i < 4; i++){
      const f = new Face(this._id);
      this.add(f);
      this._face.push(f);

      if(i >= 4) {
        f.setOneColor(new Color(0xffffff))
      }
    }
  }

  public setBoxSize(w: number, h: number, d: number):void {
    this._size.set(w, h, d);
  }

  protected _update():void {
    super._update();

    this.rotation.y += 0.05;
    // this.rotation.x += 0.0065;

    this.scale.y = -1;

    const w = this._size.x;
    const h = this._size.y;
    const d = this._size.z;


    this._face.forEach((val,i) => {
      if(i == 0) {
        val.scale.set(w, h, 1);
        val.position.z = d * 0.5;
      }

      if(i == 1) {
        val.scale.set(w, h, 1);
        val.rotation.y = Util.instance.radian(90);
        val.position.x = d * 0.5;
      }

      if(i == 2) {
        val.scale.set(w, h, 1);
        val.rotation.y = Util.instance.radian(180);
        val.position.z = -d * 0.5;
      }

      if(i == 3) {
        val.scale.set(w, h, 1);
        val.rotation.y = Util.instance.radian(270);
        val.position.x = d * -0.5;
      }

      if(i == 4) {
        val.scale.set(w, d, 1);
        val.rotation.x = Util.instance.radian(-90);
        val.position.y = h * 0.5;
      }

      if(i == 5) {
        val.scale.set(w, d, 1);
        val.rotation.x = Util.instance.radian(90);
        val.position.y = h * -0.5;
      }

    });
  }
}