const path = require('path');
const fs = require('fs');
const program = require('commander')
const spawn = require('child_process').spawn;
const execFile = require('child_process').execFile
const execSync = require('child_process').execSync;
const COMMON_PACKAGE_DIR = 'dist/common';
const ANDROID_PACKAGE_DIR = 'dist/android';
const IOS_PACKAGE_DIR = 'dist/ios';

function packageFunc(baseDir, otherParams) {
    console.log('删除文件夹' + baseDir)
    execSync(`rm -rf ${baseDir}`);
    console.log(`新建文件夹${baseDir}`)
    fs.mkdirSync(baseDir);
    console.log('开始打包 ')
    const params = [
        './node_modules/react-native/local-cli/cli.js',
        'bundle',
        '--dev', false,
        '--reset-cache',
    ]
    const res = spawn('node', params.concat(otherParams))
    res.stdout.on('data', function (data) {
        console.log(data + '')
    });
    res.stderr.on('data', function (data) {
        console.log(data + '')
    });
}

program
    .command('base')
    .description('开始打common包')
    .action(() => {
        packageFunc(COMMON_PACKAGE_DIR, [
            '--platform', 'android',
            '--entry-file', 'base.js',
            '--bundle-output', `${COMMON_PACKAGE_DIR}/base.bundle`,
            '--sourcemap-output', `${COMMON_PACKAGE_DIR}/base.map`,
            '--assets-dest', `${COMMON_PACKAGE_DIR}/asserts`,
            '--config', '../../../../metro.config.js']);
    })

program
    .command('android')
    .description('开始打android包')
    .action(() => {
        packageFunc(ANDROID_PACKAGE_DIR, [
            '--platform', 'android',
            '--entry-file', 'index.js',
            '--bundle-output', `${ANDROID_PACKAGE_DIR}/android.bundle`,
            '--sourcemap-output', `${ANDROID_PACKAGE_DIR}/android.map`,
            '--assets-dest', `${ANDROID_PACKAGE_DIR}/asserts`,
            '--config', '../../../../business.config.js']);
    })

program
    .command('ios')
    .description('开始打ios包')
    .action(() => {
        packageFunc(IOS_PACKAGE_DIR, [
            '--platform', 'ios',
            '--entry-file', 'index.js',
            '--bundle-output', `${IOS_PACKAGE_DIR}/ios.bundle`,
            '--sourcemap-output', `${IOS_PACKAGE_DIR}/ios.map`,
            '--assets-dest', `${IOS_PACKAGE_DIR}`,
            '--config', '../../../../business.config.js']);
    })
program.parse(process.argv);