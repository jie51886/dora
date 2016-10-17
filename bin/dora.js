#!/usr/bin/env node  
var program = require('commander');

var cmd = require("../command");

program
    .allowUnknownOption()
    .version('0.0.1')
    .usage("test")

program
    .command("create [project name]")
    .description("create project")
    .allowUnknownOption()
    .action(function(project){
        cmd.create(project)
    })

program.parse(process.argv);