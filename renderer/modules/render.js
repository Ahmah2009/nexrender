'use strict';

const spawn = require('child_process').spawn;

const AEBINARY = process.env.AEBINARY;

class Render {

    /**
     * Starts rendering
     * @return {Promise}
     */
    start(project) {
        this.project = project;
        return new Promise(this.resolver);
    }

    /**
     * Resolves promise
     * @param  {Function}
     * @param  {Function}
     * @return {[type]}
     */
    resolver(resolve, reject) {
        let aedata = [];

        let ae = spawn(binary, [
            '-project',     this.project.template,
            '-comp',        this.project.composition,
            '-OMtemplate',  this.project.template,
            '-s',           this.project.startframe,
            '-e',           this.project.endframe,
            '-output',      this.project.output
        ]);

        ae.stdout.on('data', (data) => {
            aedata.push(data.toString());
        });

        ae.stderr.on('data', (data) => {  
            aedata.push(data.toString());
        });

        ae.on('close', (code) => {
            let data = aedata.join('');
            return (code !== 0) ? reject(data) : resolve(data);
        });
    }

    onClose() {

    }
}

module.exports = Render;