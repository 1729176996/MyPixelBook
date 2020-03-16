//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		$scope.username = '';//用户名
		$scope.password = '';//密码
		$scope.nick = '';//昵称
	};
	$scope.register = function(){
		var username = $scope.username;
		var password = $scope.password;
		var repassword = $scope.repassword;
		var nick = $scope.nick;
		if(!username){
			$scope.alertMsg('用户名不能为空');
			return;
		}
		if(!password){
			$scope.alertMsg('密码不能为空');
			return;
		}
		if(!repassword){
			$scope.alertMsg('密码验证不能为空');
			return;
		}
		if(!(password===repassword)){
			$scope.alertMsg('两次密码不一样');
			return;
		}
		if(!nick){
			$scope.alertMsg('昵称不能为空');
			return;
		}
		var sendObj = {
			username:username,
			password:password,
			nick:nick
		};
		$http({
			method:'GET',
			url:url+'/register?username='+username+'&password='+password+'&nick='+nick
		}).then(function(response){
			$scope.names = response.data.sites;
			if(response.data.code==200){
				$('#successAlert').modal('toggle');
			}else{
				$scope.alertMsg(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			$scope.alertMsg('网络失败');
		});
	};
	//返回上一页
	$scope.back = function(){
		window.history.back(-1);
	}
	//提示框
	$scope.alertMsg = function(msg){
		$scope.msg = msg;
		$('#alertMsg').modal('toggle');
	}
	
	/**
	 * 垂直居中模态框 
	 **/
	function centerModals() { 
		$('.modal').each(function(i) { 
			var $clone = $(this).clone().css('display', 'block').appendTo('body'); 
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2); 
			top = top > 50 ? top : 0; 
			$clone.remove(); 
			$(this).find('.modal-content').css("margin-top", top - 50); 
		}); 
	} 
	// 在模态框出现的时候调用垂直居中方法 
	$('.modal').on('show.bs.modal', centerModals); 
	// 在窗口大小改变的时候调用垂直居中方法 
	$(window).on('resize', centerModals);
});