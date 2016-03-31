$().ready(function(){
	/**
	 * 该方法是jquery对最原始的ajax操作进行的封装
	 * 第一个参数   url
	 * 第二个参数   客户端传递到服务器端的数据
	 * 第三个参数   是一个回调函数
	 *     是服务器成功返回时要执行的函数
	 *     该回调函数必须是readyState的值为4，status的值为200时才能调用
	 *     
	 * 该方法只能接受到服务器端成功响应后的结果
	 */
	$.post("../../AjaxPostServlet",null,function(data){
		alert(data);
	});
});
