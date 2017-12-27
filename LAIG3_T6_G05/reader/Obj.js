/**
 * Obj reader for files exported from 3d Builder, windows 10 app
 * Texture can't be applied though, you're free to implement texCoords and improve this parser
 * 26/12/2015
 * Constructor of a Obj object.
 *
 * @constructor Obj
 * @param scene 	Scene that will display this object
 * @param path 	Path to the .obj file
 *
 */
function Obj(scene, path) {

    this.scene = scene;

    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, false);

    let self = this;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                let allText = rawFile.responseText;
                self.initBuffers(allText);
            }
        }
    }
    rawFile.send(null);

}

Obj.prototype = Object.create(CGFobject.prototype);
Obj.prototype.constructor = Obj;

/**
 * Initiates the several .obj elements.
 *
 * @method initBuffers
 * @param {String}     info		.obj file info
 */
Obj.prototype.initBuffers = function (info) {

    let lines = info.split('\n');

    this.objects = [];

    info = [];
    let objects = 0;
    let lastVerticeNmbr = 0;
    let vertices = 0;

    for (line in lines) {
        let elements = lines[line].split(' ');
        if (elements[0] === 'o') {

            if (objects > 0) {
                let obj = new MyPiece(this.scene, info, lastVerticeNmbr, vertices);
                this.objects.push(obj);
                lastVerticeNmbr += vertices;
                vertices = 0;
                info = [];
            }
            objects++;

        } else if (elements[0] === 'f' || elements[0] === 'v') {

            info.push(lines[line]);
            if (elements[0] === 'v') vertices++;

        }

    }

    this.objects.push(new MyPiece(this.scene, info, lastVerticeNmbr,vertices));

};

/**
 * Displays the several .obj objects.
 *
 * @method display
 */
Obj.prototype.display = function () {

    for (i in this.objects)
        this.objects[i].display();

};