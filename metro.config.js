'use strict';
const fs = require('fs');

console.log('metro.config.js')
// let countModuleId = 1;
// let moduleIds = {};
// module.exports = {
//     serializer: {
//         createModuleIdFactory: () => (path) => {
//             let moduleId;
//             if (moduleIds[path]) {
//                 moduleId = moduleIds[path];
//             } else {
//                 countModuleId++;
//                 moduleIds[path] = countModuleId;
//                 moduleId = countModuleId;
//             }
//             console.log('--->' + moduleId + '  ' + path)
//             fs.writeFile('baseConfig.json', JSON.stringify(moduleIds));
//             return moduleId;
//         }
//     }
// };

// let countModuleId = 1000;
// let moduleIds = {};

// const BaseConfig = require('./baseConfig.json');
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
            fs.writeFile('base.mainfest.json', JSON.stringify(fileToMap));
            return id;
        }
    }
}

module.exports = {
    transformer: {
        assetRegistryPath: 'rn-business'
    },
    serializer: {
        // processModuleFilter: (params) => {
        //     const {path = ''} = params;
        //     if (BaseConfig[path]) {
        //         console.log('filter ' + path)
        //         return false;
        //     } else {
        //         console.log(params.path)
        //         return true;
        //     }
        // },
        createModuleIdFactory: createModuleIdFactory
    }
}


// function createModuleIdFactory() {
//     const projectRootPath = __dirname;
//     console.log('projectRootPath:'+projectRootPath)
//     return path => {
//         let name = '';
//         console.log(path)
//         if (path.indexOf('node_modules/react-native/Libraries/') > 0) {
//             name = path.substr(path.lastIndexOf('/') + 1);
//         } else if (path.indexOf(projectRootPath) == 0) {
//             name = path.substr(projectRootPath.length + 1);
//         }
//         name = name.replace('.js', '');
//         name = name.replace('.png', '');
//         name = name.replace(new RegExp("/", "gm"), '_');
//         console.log('name:' + name)
//         return name;
//     };
// }
//
//
// module.exports = {
//
//     serializer: {
//         createModuleIdFactory: createModuleIdFactory
//         /* serializer options */
//     }
// };