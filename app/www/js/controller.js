angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})
.controller('findFormCtrl', function($scope, $rootScope, $timeout) {
	$scope.slideIndex = 1;
	
	$scope.showDivs = function(n){
		var i;
		var x = document.getElementsByClassName("mySlides");
		if (n > x.length) {$scope.slideIndex = 1}    
		if (n < 1) {$scope.slideIndex = x.length}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";  
		}
		x[$scope.slideIndex-1].style.display = "block"; 
	};
	$scope.plusDivs = function(n) {
		$scope.showDivs($scope.slideIndex += n);
	}
	$scope.show = function() {
		document.getElementById("ctrlbutton").classList.remove("hide");
		$scope.plusDivs(0);
	};
})

.controller('HomeCtrl', function($scope, $rootScope, $interval, $ionicPlatform, logincheck) {
	var tip = ["ถั่วแมคคาเดเมียจะทำให้กล้ามเนื้อสุนัขอ่อนแรง โดยจะส่งผลกับขาหลังของสุนัข อาจเป็นหนักถึงอัมพาต",
	"ไข่ดิบจะทำให้สุนัขขาดไบโอติน ผลก็คือ ผิวจะแห้ง และเป็นเกล็ดขุยๆ ขนหลุดร่วง เจริญเติบโตช้ากว่าปกติ",
	"ผักบุ้ง (Morning glory) เป็นโทษกับสุนัข",
	"พลูด่าง (Golden pothos) หากสุนัขกินเข้าไปแล้ว จะทำให้เกิดการระคายเคืองภายในช่องปาก",
	"สุนัขสามารถสื่อสารบอกอารมณ์ด้วยหางของมัน การกระดิกหางเป็นภาษากายที่กำลังบอกว่า ดีใจ",
	"สุนัขส่วนใหญ่ไม่มีเอนไซม์ใช้ย่อยน้ำตาลแลคโตสในนมวัว จะทำให้เกิดท้องเสีย อาเจียน และเซื่องซึม",
	"หัวหอมและกระเทียม จะไปทำลายเซลล์เม็ดเลือดแดง ส่งผลให้สุนัขเป็นโรคโลหิตจาง และโรคเลือดไหลไม่หยุด",
	"ปรงสาคู (Cycas revoluta) เสี่ยงเป็นอันตรายต่อชีวิตสุนัข",
	"การลูบไล้จะช่วยลดความดันโลหิตของแมวได้",
	"แมวตั้งท้องประมาณ 62 - 65 วัน นับจากวันที่ผสมจนถึงวันคลอด",
	"แมวมีความไวต่อแรงสั่นสะเทือนสูงมาก ดังนั้นแมวจะได้รับสัมผัสแรงสั่นสะเทือนแผ่นดินไหวได้ก่อนมนุษย์ 10 - 15 นาที",
	"ปัสสาวะของแมวจะเรืองแสง เมื่อถูกส่งด้วยแสงแบล๊คไลท์",
	"ปกติแมวจะไม่ร้องเสียงเหมืยวใส่แมวตัวอื่น จะร้องเสียงนี้ใส่คนเท่านั้น แต่จะทำเสียงครวญครางและเสียงขู่ใส่แมวตัวอื่น",
	"แมวเพศเมียมักถนัดใช้มือขวา ส่วนแมวเพศผู้มักถนัดซ้าย",
	"แมวไม่มีต่อมเหงื่อ ยกเว้นที่อุ้งเท้า",
	"แมวทำเสียงต่างๆได้ประมาณ 100 เสียง ในขณะที่สุนัขทำได้แค่ 10 เสียง ",
	"ถ้าแมวเอาหน้าเขาไปถูกับตัวคุณ แปลว่าเขายอมรับและแสดงความรักกับคุณ",
	"หากเจ้าเหมียวเจอหน้าคุณแล้วพวกมันยกหางชี้ตรง ปลายหางแกว่งเล็กน้อย แสดงว่าพวกมันกำลังแสดงความรักต่อคุณ",
	"การเคี้ยวเนื้อสดจะช่วยให้เหงือกและฟันของแมวมีสุขภาพที่ดีและแข็งแรงยิ่งขึ้น",
	"วิธีการอุ้มกระต่าย ต้องทำให้รู้สึกผ่อนคลายโดยการลูบขนเบาๆ จากนั้นเอามือสอดเข้าไปใต้ท้องแล้วดึงเข้ามาแนบลำตัว",
	"อย่าหิ้วหูกระต่ายเด็ดขาด!!",
	"กระต่ายเป็นสัตว์ที่ชอบหลบซ่อนอยู่ในมุมมืด",
	"ไม่ควรให้กระต่ายกินอาหารเม็ดเพียงอย่างเดียว",
	"กระต่ายเป็นสัตว์ที่เครียดง่ายและชอบให้ลูบหัว",
	"กระต่ายเป็นสัตว์สังคมชอบอยู่รวมกันหลายตัว",
	"หนูแฮมสเตอร์ชอบกินไข่ต้มที่ต้มสุก",
	"กระรอกมีการสะสมหรือซ่อนอาหารไว้กินในฤดูหนาว",
	"ต้นบอนสี (Caladium) เป็นพืชที่มีพิษกับสุนัข หรือแมว"];

	$scope.tipOf= "ช็อตโกแลต เป็นอาหารต้องห้ามของเหล่าสัตว์เลี้ยง";
	$scope.randomtip= function () {
		$scope.tipOf = tip[Math.floor(Math.random()*tip.length)];
	}
	$interval( function(){ $scope.randomtip(); }, 10000);
	$scope.go = function () {		
		logincheck.go();
	}
})

.controller('LoginCtrl', function($scope, $state, logincheck) {
	$scope.login = function () {		
		logincheck.enter();
		$state.go("app.home");
	};	
})

.controller('ProfileCtrl', function($scope, $state, logincheck) {
	$scope.logout = function () {		
		logincheck.leave();
	};
})

.factory('logincheck', function($rootScope, $state){
     
     var hasLogin = false;

     return {
        go: function(){
			if(!hasLogin){
				$state.go("app.login");
			}else{
				$state.go("app.profile");
			}
        },
        enter : function(){
			hasLogin = true;			
        },
		leave : function(){
			hasLogin = false;			
        }		
     }

});