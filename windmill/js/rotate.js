export default function(tar, options) {
    let { geometry } = tar;
    let center = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(center);
    geometry.center();
    let { rx, ry, rz } = options;
    rx && geometry.rotateX(rx);
    ry && geometry.rotateX(ry);
    rz && geometry.rotateX(rz);
    let { x, y, z } = center;
    geometry.translate(x, y, z);
}