//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		$scope.getList();
	}
	$scope.getList = function(){
		$scope.list = [];
		$http({
			method:'GET',
			url:url+'/getItems'
		}).then(function(response){
			//$scope.names = response.data.sites;
			if(response.data.code==200){
				$scope.list = response.data.data;
			}else{
				weui.alert(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			weui.alert('网络失败');
		});
	};
	
});