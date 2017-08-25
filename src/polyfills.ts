// Polyfills
// 使普通浏览器支持完整的es6语法
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)

//支持ie低版本系列

/*
import 'ie-shim'; // Internet Explorer
import 'es6-shim';
import 'es6-promise';
import 'es7-reflect-metadata';
*/

// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';


// Typescript emit helpers polyfill
//import 'ts-helpers';