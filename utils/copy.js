const copy = module.exports = {
    copyDeep(o, n) {
        let oType = Object.prototype.toString.call(o);
        let nType = Object.prototype.toString.call(n);
        if (nType == '[object Object]' && oType == '[object Object]') {
            //合并属性(object)
            for (let p in n) {
                if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) {
                    o[p] = n[p];
                } else if (n.hasOwnProperty(p) && (o.hasOwnProperty(p))) {
                    let oPType = Object.prototype.toString.call(o[p]);
                    let nPType = Object.prototype.toString.call(n[p]);
                    if ((nPType == '[object Object]' && oPType == '[object Object]') || (nPType == '[object Array]' && oPType == '[object Array]')) {
                        arguments.callee(o[p], n[p]);
                    } else {
                        o[p] = n[p];
                    }
                }
            }
        } else if (nType == '[object Array]' && oType == '[object Array]') {
            //合并属性(array)
            for (let i in n) {
                let oIType = Object.prototype.toString.call(o[i]);
                let nIType = Object.prototype.toString.call(n[i]);
                if ((nIType == '[object Object]' && oIType == '[object Object]') || (nIType == '[object Array]' && oIType == '[object Array]')) {
                    arguments.callee(o[i], n[i]);
                } else {
                    o[i] = n[i];
                }
            }
        }

        //合并属性(other)
        o = n;
    }
}

// let a = { dependencies: { axios: '^0.19.0' }, devDependencies: {} };
// let b = {
//     dependencies: {},
//     devDependencies: { 'lib-flexible': '^0.3.2', 'postcss-pxtorem': '^4.0.1' }
// }

// console.log({...a});