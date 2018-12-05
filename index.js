/** @format */

import {AppRegistry, NativeModules} from 'react-native';

// import {name as appName} from './app.json';

const {setCustomSourceTransformer} = require('resolveAssetSource');
const PixelRatio = require('PixelRatio');
const AssetSourceResolver = require('AssetSourceResolver');
const assetPathUtils = require('./node_modules/react-native/local-cli/bundle/assetPathUtils');

function getAssetPathInDrawableFolder(asset) {
    const scale = AssetSourceResolver.pickScale(asset.scales, PixelRatio.get());
    const drawableFolder = assetPathUtils.getAndroidResourceFolderName(asset, scale);
    const fileName = assetPathUtils.getAndroidResourceIdentifier(asset);
    return `${drawableFolder}/${fileName}.${asset.type}`;
}

setCustomSourceTransformer((resolver) => {
    const {SourceCode} = NativeModules;
    let bundlePath = SourceCode.scriptURL;
    if (bundlePath.startsWith('assets://')) {
        bundlePath = bundlePath.substring(9, bundlePath.lastIndexOf('/') + 1);
        const rootURL = `asset:///${bundlePath}`;
        console.log('rootURL:' + rootURL)
        const asset = resolver.asset;
        const folder = rootURL + getAssetPathInDrawableFolder(asset);
        console.log('folder:' + folder)
        return resolver.fromSource(folder);
    }
    return resolver.defaultAsset();
});
import PersonalPage from './src/PersonalPage';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('PersonalPage', () => PersonalPage)
