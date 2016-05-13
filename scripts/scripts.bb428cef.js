(function(){"use strict";angular.module("xmlFiestaUiApp",["ngAnimate","ngCookies","ngResource","ui.router","ngSanitize","ngTouch","pdf","LocalStorageModule","pascalprecht.translate"]).config(["localStorageServiceProvider","$translateProvider","TRANSLATIONS_EN","TRANSLATIONS_ES",function(a,b,c,d){return a.setPrefix("XMLFiesta"),b.translations("en",c).translations("es",d).preferredLanguage("es").fallbackLanguage("en")}]).config(["$stateProvider","$urlRouterProvider",function(a,b){return a.state("home",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).state("verify",{url:"/verify",templateUrl:"views/verify.html",controller:"VerifyCtrl",controllerAs:"verify"}).state("contact",{url:"/contact",templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).state("config",{url:"/config",templateUrl:"views/config.html",controller:"ConfigCtrl",controllerAs:"config"}),b.otherwise("/")}])}).call(this),function(){angular.module("xmlFiestaUiApp").constant("TRANSLATIONS_ES",{HEADER:{HOME:"Home",VERIFY:"Verificar XML",CONTACT:"Contacto",CONFIGURATION:"Configuración"}})}.call(this),function(){angular.module("xmlFiestaUiApp").constant("TRANSLATIONS_EN",{HEADER:{HOME:"Home",VERIFY:"Verify XML",CONTACT:"Contact",CONFIGURATION:"Configuration"}})}.call(this),function(){"use strict";angular.module("xmlFiestaUiApp").controller("MainCtrl",function(){})}.call(this),function(){"use strict";angular.module("xmlFiestaUiApp").controller("VerifyCtrl",["$scope","localStorageService",function(a,b){var c;PDFJS.workerSrc="scripts/pdf.worker.js",c=function(){var c;return a.certs=[],(c=b.get("rootCerts"))?angular.forEach(c,function(b){return a.certs.push(b)}):void 0},c(),a.ready=a.certs.length>0,a.upload=null,a.doc=null,a.pdfUrl=null,a.$watch("upload",function(b){var c,d,e;if(b)return e=XMLFiesta.Document.fromXml(b.result.raw),d=e.document,a.doc=d,a.oHashValid=e.xmlOriginalHash===d.originalHash,a.signatures=d.signatures(),a.signatures.forEach(function(b){return b.valid=b.valid(d.originalHash),b.certificate.valid=!1,angular.forEach(a.certs,function(a){b.certificate.valid||(b.certificate.valid=b.certificate.isCa(a.content))})}),c=new Blob([d.pdfBuffer()],{type:"application/pdf"}),a.pdfUrl=URL.createObjectURL(c)})}])}.call(this),function(){"use strict";angular.module("xmlFiestaUiApp").controller("ContactCtrl",function(){})}.call(this),function(){"use strict";angular.module("xmlFiestaUiApp").controller("ConfigCtrl",["$scope","localStorageService",function(a,b){var c;c=function(){var c;return a.certs=[],(c=b.get("rootCerts"))?angular.forEach(c,function(b){return a.certs.push(b)}):void 0},c(),a.clear=function(){return b.clearAll(),c()},a.setRootCerts=function(d){var e;return e=b.get("rootCerts")||{},angular.forEach(d.target.files,function(d){var f;return f=new FileReader,f.addEventListener("load",function(a){return e[d.name]={name:d.name,content:a.target.result},b.set("rootCerts",e),angular.element(".cert-uploader").val("")}),f.addEventListener("loadend",function(){return c(),a.$apply()}),f.readAsText(d)})}}]).directive("customOnChange",function(){return{restrict:"A",link:function(a,b,c){var d;return d=a.$eval(c.customOnChange),b.bind("change",d)}}})}.call(this),function(){angular.module("xmlFiestaUiApp").directive("dropzone",[function(){return{link:function(a,b){b.bind("dragover",function(a){a.stopPropagation(),$(this).addClass("image-dropping")}).bind("dragleave",function(a){a.stopPropagation(),$(this).removeClass("image-dropping")}).bind("drop",function(a){a.stopPropagation(),$(this).removeClass("image-dropping")}),$("body").bind("dragover",function(a){a.stopPropagation(),b.addClass("image-dragging")}).bind("dragleave",function(a){a.stopPropagation(),b.removeClass("image-dragging")})}}}])}.call(this),function(){angular.module("xmlFiestaUiApp").directive("fileread",[function(){"use strict";return{scope:{fileread:"="},link:function(a,b,c){b.bind("change",function(b){var d,e,f,g,h,i;if(i=new FileReader,g=b.target.files[0],d=c.accept?c.accept.replace(".","").toLowerCase():null,e=void 0,h=void 0,f=void 0,g){if(e=c.accept===g.type,h=null!==g.type.match(d),f=g.name.substr(-3)===d,!(e||h||f))return void a.$apply(function(){a.fileread={errors:["Este tipo de archivo no está soportado, por favor sube un "+c.acceptName+"."]}});i.addEventListener("load",function(b){a.$apply(function(){var c;c=b.target.result,a.fileread={type:g.type,name:g.name,file:g,result:{data:"",hash:"",raw:c}}})}),!g||angular.isDefined(c.raw)&&"false"===c.raw||(c.binary?i.readAsBinaryString(g):c.text?i.readAsText(g):i.readAsArrayBuffer(g))}})}}}])}.call(this),angular.module("xmlFiestaUiApp").run(["$templateCache",function(a){"use strict";a.put("views/config.html",'<div class="form-group"> <label for="cert-uploader">Select the Root certificates</label> <input id="cert-uploader" type="file" accept=".crt" class="cert-uploader" custom-on-change="setRootCerts" multiple> <p class="help-block">You can select seeral files in one go.</p> </div> <div ng-show="certs.length > 0" class="root-certificates"> <h3> Root Certificates <button ng-click="clear()" class="btn btn-sm btn-default glyphicon glyphicon-trash"></button> </h3> <ul> <li ng-repeat="cert in certs | orderBy:\'name\'"> {{ cert.name }} </li> </ul> </div>'),a.put("views/contact.html","<h3>Contact</h3>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/pdfViwer.html",'<nav class="pdf-controls" ng-class="getNavStyle(scroll)"> <button class="btn" ng-click="goPrevious()">&lt;</button> <button class="btn" ng-click="goNext()">&gt;</button> <span>Page: </span> <span> {{pageNum}} / {{pageCount}}</span> <a href="{{pdfUrl}}" target="_blank">Download</a> </nav> <hr> <canvas id="pdf-canvas" class="rotate0"></canvas>'),a.put("views/verify.html",'<div ng-if="!ready"> Please <a ui-sref="config">upload</a> the root certificates first. </div> <div class="row" ng-show="ready && !pdfUrl"> <div class="upload text-center" dropzone> <div class="upload-default"> <h6 class="bottom-padder-sm margin-15">Drag the XML you want to verify.</h6> <button class="btn">or click here to select one</button> <input accept-name="XML" accept="text/xml" text="true" class="file-upload-input" fileread="upload" required type="file"> </div> </div> </div> <div ng-show="pdfUrl"> <h2>Signatures</h2> <ul class="list-unstyled"> <li><strong>Document:</strong> {{ doc.name }}</li> <li ng-class="{\'text-success\': oHashValid, \'text-danger\': !oHashValid}"> <strong>Original Hash: </strong> <span>{{ doc.originalHash }}</span> <i class="glyphicon" ng-class="{\'glyphicon-ok\': oHashValid, \'glyphicon-remove\': !oHashValid}"></i> <a href="" ng-show="!oHashValid" ng-click="showOHashError = !showOHashError">Why?</a> <div class="alert alert-danger alert-incorrect" ng-show="showOHashError" role="alert"> The original hash is incorrect </div> </li> </ul> <hr> <div id="signers"> <ul class="list-unstyled" ng-repeat="signature in signatures"> <li><strong>Signed by:</strong> {{ signature.signer.name }} &lt;{{ signature.signer.email }}&gt;</li> <li><strong>Signed date:</strong> {{ signature.signedAt }}</li> <li><strong>RFC:</strong> {{ signature.signer.id }}</li> <li ng-class="{\'text-success\': signature.certificate.valid, \'text-danger\': !signature.certificate.valid}"> <strong>Certificate number: <i class="glyphicon" ng-class="{\'glyphicon-ok\': signature.certificate.valid, \'glyphicon-remove\': !signature.certificate.valid}"></i></strong> <span>{{ signature.certificate.getSerialNumber() }}</span> <a href="" ng-show="!signature.certificate.valid" ng-click="signature.showCertError = !signature.showCertError">Why?</a> <div class="alert alert-danger alert-incorrect" ng-show="signature.showCertError" role="alert"> The <strong>certificate</strong> was not created with any of the <strong>root certificates</strong> that provided in \'Configuration\' page.<br> Please provide new ones. If you still see this error, it means the certificate was not issued by who says. </div> </li> <li ng-class="{\'text-success\': signature.valid, \'text-danger\': !signature.valid}"> <strong>Signature: <i class="glyphicon" ng-class="{\'glyphicon-ok\': signature.valid, \'glyphicon-remove\': !signature.valid}"></i></strong> <span class="wrap-text">{{ signature.sig(\'base64\') }}</span> <a href="" ng-show="!signature.valid" ng-click="signature.showValidError = !signature.showValidError">Why?</a> <div class="alert alert-danger alert-incorrect" ng-show="signature.showValidError" role="alert"> The <strong>signature</strong> is not valid.<br> The private key of the certificate did not sign this document. </div> </li> </ul> </div> <div id="pdf-container"> <ng-pdf template-url="views/pdfViwer.html"></ng-pdf> </div> </div>')}]);