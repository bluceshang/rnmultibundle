// let countModuleId = 1000;
// let moduleIds = {};
// console.log('business config js');
//
// const BaseConfig = require('./baseConfig.json');
//
// module.exports = {
//     transformer:{
//         assetRegistryPath:'rn-business'
//     },
//     serializer: {
//         processModuleFilter: (params) => {
//             const {path = ''} = params;
//             if (BaseConfig[path]) {
//                 console.log('filter ' + path)
//                 return false;
//             } else {
//                 console.log(params.path)
//                 return true;
//             }
//         },
//         createModuleIdFactory: () => (path) => {
//             console.log('--->' + (BaseConfig[path]) + '  ' + path)
//             if (BaseConfig[path]) {
//                 return BaseConfig[path];
//             } else if (moduleIds[path]) {
//                 return moduleIds[path];
//             } else {
//                 countModuleId++;
//                 moduleIds[path] = countModuleId;
//                 return countModuleId;
//             }
//         }
//     }
// }

function postProcessModulesFilter(module) {
    const projectRootPath = __dirname;
    // console.log("---" + JSON.stringify({path: module.path, type: module.output[0].type}))
    if (module['path'].indexOf('__prelude__') >= 0) {
        return false;
    }
    if (module['path'].indexOf('/node_modules/') > 0) {
        if ('js/script/virtual' == module['output'][0]['type']) {
            return true;
        }
        return false;
    }
    return true;
}

// function createModuleIdFactory() {
//     const projectRootPath = __dirname;
//     return path => {
//         //console.log('path ',path);
//         let name = '';
//         if (path.indexOf('node_modules/react-native/Libraries/') > 0) {
//             name = path.substr(path.lastIndexOf('/') + 1);
//         } else if (path.indexOf(projectRootPath) == 0) {
//             name = path.substr(projectRootPath.length + 1);
//         }
//         name = name.replace('.js', '');
//         name = name.replace('.png', '');
//         name = name.replace(new RegExp("/", "gm"), '_');
//         return name;
//     };
// }
const fs = require('fs');
const crypto = require('crypto');
function createModuleIdFactory() {
    const fileToMap = Object.create({});
    const projectRootPath = __dirname;
    const usedIds = {}
    let startId = 0;
    return path => {
        let name = '';
        if (path.indexOf('node_modules/react-native/Libraries/') > 0) {
            name = path.substr(path.lastIndexOf('/') + 1);
        } else if (path.indexOf(projectRootPath) == 0) {
            name = path.substr(projectRootPath.length + 1);
        }
        name = name.replace('.js', '');
        name = name.replace('.png', '');
        name = name.replace(new RegExp("/", "gm"), '_');
        if (fileToMap[name]) {
            return fileToMap[name].base64;
        } else {
            const hash = crypto.createHash('md5');
            hash.update(name);
            const id = hash.digest('base64');
            const hashCode = startId++;
            usedIds[id] = path;
            fileToMap[name] = {base64: id, id: hashCode};
            fs.writeFile('business.mainfest.json', JSON.stringify(fileToMap));
            return id;
        }
    }
}

module.exports = {

    serializer: {
        createModuleIdFactory: createModuleIdFactory,
        processModuleFilter: postProcessModulesFilter
        /* serializer options */
    }
};