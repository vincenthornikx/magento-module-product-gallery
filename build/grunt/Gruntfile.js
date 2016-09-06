/*
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 3.0).
 * This license is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/gpl-3.0.en.php
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future.
 *
 * @category    Maxserv: Magento Modules
 * @package     MaxServ_ProductGallery
 * @author      Vincent Hornikx <vincent.hornikx@maxser.com>
 * @copyright   Copyright (c) 2016 MaxServ (http://www.maxserv.com)
 * @license     http://opensource.org/licenses/gpl-3.0.en.php General Public License (GPL 3.0)
 */
module.exports = function (grunt) {
    "use strict";

    var gruntConfigObject;

    gruntConfigObject = {
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            compile: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: [{
                    src: "../../view/frontend/web/scss/styles.scss",
                    dest: "../../view/frontend/web/css/styles.min.css"
                }]
            }
        },
        watch: {
            sass: {
                files: '../../view/frontend/web/scss/{,*/}*.scss',
                tasks: ['sass:compile']
            }
        }
    };

    grunt.initConfig(gruntConfigObject);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass:compile', 'watch']);
};
