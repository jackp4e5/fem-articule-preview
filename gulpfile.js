const {src,dest,watch,series}= require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano =require('cssnano');
 const autoprefixer = require('autoprefixer')

const imagemin =require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');


function css ( done ){
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss( [ autoprefixer(), cssnano()] ) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
  
      done();
  }
 
  function dev (){
    return watch('src/scss/**/*.scss', css);
  }
  function imagenes(){
    return src('src/img/**/*')
            .pipe(imagemin({optimizationLevel: 3}))
           .pipe(dest('build/img'))
 }

 function versionWebp (){
    const opciones = {
      quality:50
    }
  return src('src/img/**/*.{png,jpg}')
            .pipe(webp(opciones))
            .pipe(dest('build/img'))
}

 function versionAvif (){
    const opciones = {
        quality:50
      }
    return src('src/img/**/*.{png,jpg}')
              .pipe(avif(opciones))
              .pipe(dest('build/img'))
  }
  exports.css = css;
  exports.dev = dev;
  exports.imagenes= imagenes;
  exports.versionAvif= versionAvif;
  exports.versionWebp= versionWebp;
  exports.default = series(imagenes,versionAvif,versionWebp,css,dev)