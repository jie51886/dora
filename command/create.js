const fs = require("fs");
const path = require("path")
const cwdpath = process.cwd();
const prompt = require('prompt');

function copyFolder(source, target) {
    fs.mkdir(target, (err, res) => {

        var files = fs.readdirSync(source);
        files.forEach(function(file) {
            var spath = path.join(source, file)
            var tpath = path.join(target, file)
            var stats = fs.statSync(spath);
            switch (true) {
                case stats.isFile():
                    copyFile(spath, tpath)
                    break;
                case stats.isDirectory():
                    copyFolder(spath, tpath)
                    break;
            }
        })
    })
}

function copyFile(source, target) {
    var buf = fs.readFileSync(source);
    fs.writeFileSync(target, buf);
}


function createProjectByPath(dir) {
    var project = path.basename(dir)
    var tmpDir = path.join(cwdpath, "/project")
    copyFolder(tmpDir, project)
}

function createProject(project) {
    if (project == undefined) {

        prompt.start()

        prompt.get({
            properties: {
                name: {
                    description: "当前文件夹创建工程?(y/n)"
                }
            }
        }, (err, result) => {
            if (result.name.toLowerCase() == "y") {
                createProjectByPath(cwdpath)
            }
        })
    } else {
        var dir = path.join(cwdpath, project)
        fs.stat(dir, (err, stats) => {
            if (!err) {
                // 文件夹存在
                console.error('文件夹已存在');
                return;
            }
            fs.mkdir(dir, (err, res) => {
                createProjectByPath(dir)
            })

        })
    }
}

module.exports = createProject