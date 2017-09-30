
/**
 * MyPrimitivesFactory
 * @param type
 * @param args
 * @constructor
 */
function MyPrimitivesFactory(scene, type, args){

    var primitive;
    //Todo: Change this to a map?

    switch(type){
        case 'triangle':
            primitive = new MyTriangle(scene, new Vector3(args[0], args[1], args[2]), new Vector3(args[3], args[4], args[5]), new Vector3(args[6], args[7], args[8]));
            break;
        case 'rectangle':
            primitive = new MyRectangle(scene, new Vector2(args[0], args[1]), new Vector2(args[2], args[3]));
            break;
        case 'sphere':
            primitive = new MySphere(scene, args[0], args[1], args[2]);
            break;
        case 'cylinder':
            primitive = new MyCylinder(scene, args[0], args[1], args[2], args[3], args[4]);
            break;

    }

    return primitive;
}