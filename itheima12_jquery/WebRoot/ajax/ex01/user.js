$().ready(function(){
	queryPerson();
	/**
	 * 批量删除的功能
	 */
	$("#deleteUser").click(function(){
		//checkedNodes是jquery对象
		var checkedNodes = $(":checkbox:not(#allCheckbox):checked");
		var checkedStr = "";
		for(var i=0;i<checkedNodes.length;i++){
			if(i==checkedNodes.length-1){
				//checkedNodes[i]是dom对象    $(checkedNodes[i])是jquery对象
				checkedStr = checkedStr + $(checkedNodes[i]).parent().attr("id");
			}else{
				checkedStr = checkedStr + $(checkedNodes[i]).parent().attr("id")+",";
			}
		}
		$.post("../../PersonServlet",{
			method:'deleteByIds',
			ids:checkedStr
		},function(data){
			$(":checkbox:not(#allCheckbox):checked").parent().parent().remove();
		})
	});
	
	/**
	 * 实现增加功能
	 */
	$("#addUser").click(function(){
		var name = $("#name").val();
		var description = $("#description").val();
		
		//把td的属性的id的最大值提取出来
		var id = $("td[id]:last").attr("id");
		id++;
		
		//请求后台，增加一个数据
		$.post("../../PersonServlet",{
			id:id,
			name:name,
			description:description,
			method:'add'
		},function(data){
			var $checkBoxTD = $("<td/>").attr("id",id).append($("<input/>").attr("type","checkbox"));
			var $nameTD = $("<td/>").text(name);
			var $descrptionTD = $("<td/>").text(description);
			var $delA = $("<a/>").text("删除");
			$delA.css("cursor","pointer");
			/**
			 * 给删除添加一个click事件
			 */
			$delA.click(function(){
				if (window.confirm("您确认要删除吗?")) {
					var a = $(this);
					var pid = a.parent().siblings("td:first").attr("id");
					$.post("../../PersonServlet", {
						method: 'deleteById',
						pid: pid
					}, function(data){
						a.parent().parent().remove();
					});
				}
			});
			var $delTD = $("<td/>").append($delA);
			
			var $updateA = $("<a/>").text("修改");
			$updateA.css("cursor","pointer");
			/**
			 * 给修改的超级链接添加一个click
			 */
			$updateA.click(function(){
				var name = $(this).parent().siblings("td:eq(1)").text();
				var description = $(this).parent().siblings("td:eq(2)").text();
				var id = $(this).parent().siblings("td:eq(0)").attr("id");
				
				$("#name_update").val(name);
				$("#description_update").val(description);
				$("#id_update").val(id);
			});
			
			var $updateTD = $("<td/>").append($updateA);
			
			var $tr = $("<tr/>").append($checkBoxTD).append($nameTD).append($descrptionTD)
				.append($delTD).append($updateTD);
				
			$("#usertable tbody").append($tr);
		});
	});
	
	/**
	 * 完成修改的功能
	 */
	$("#updateUser").click(function(){
		var id = $("#id_update").val();
		var name = $("#name_update").val();
		var description = $("#description_update").val();
		
		$.post("../../PersonServlet",{
			method:'update',
			id:id,
			name:name,
			description:description
		},function(data){
			$("#"+id).siblings("td:eq(0)").text(name);
			$("#"+id).siblings("td:eq(1)").text(description);
		});
	});
});

/**
 * 加载后台的person数据，把person数据放入到表格中
 */
function queryPerson(){
	$.post("../../PersonServlet",{
		method:'query'
	},function(data){
		/**
		 * 把从服务器端返回到客户端的字符串变成json对象
		 *   jsonObj = [
		 *      {pid:1,name:'aaa',description:'aaa'},
		 *      {pid:2,name:'aaa',description:'aaa'}
		 *   ];
		 */
		var jsonObj = eval("("+data+")");
		for(var i=0;i<jsonObj.length;i++){
			var name = jsonObj[i].name;
			var description = jsonObj[i].description;
			var pid = jsonObj[i].pid;
			/**
			 * <tr>
			 * 		<td><input type="checkbox/>"</td>
			 * 		<td>name</td>
			 * 		<td>description</td>
			 *      <td><a>删除</a></td>
			 *      <td><a>修改</a></td>
			 * </tr>
			 */
			
			var $checkBoxTD = $("<td/>").attr("id",pid).append($("<input/>").attr("type","checkbox"));
			
			var $nameTD = $("<td/>").text(name);
			
			var $descrptionTD = $("<td/>").text(description);
			
			var $delA = $("<a/>").text("删除");
			$delA.css("cursor","pointer");
			/**
			 * 给删除添加一个click事件
			 */
			$delA.click(function(){
				if (window.confirm("您确认要删除吗?")) {
					var a = $(this);
					var pid = a.parent().siblings("td:first").attr("id");
					$.post("../../PersonServlet", {
						method: 'deleteById',
						pid: pid
					}, function(data){
						a.parent().parent().remove();
					});
				}
			});
			var $delTD = $("<td/>").append($delA);
			
			var $updateA = $("<a/>").text("修改");
			
			/**
			 * 给修改的超级链接添加一个click
			 */
			$updateA.click(function(){
				var name = $(this).parent().siblings("td:eq(1)").text();
				var description = $(this).parent().siblings("td:eq(2)").text();
				var id = $(this).parent().siblings("td:eq(0)").attr("id");
				
				$("#name_update").val(name);
				$("#description_update").val(description);
				$("#id_update").val(id);
			});
			
			$updateA.css("cursor","pointer");
			var $updateTD = $("<td/>").append($updateA);
			
			var $tr = $("<tr/>").append($checkBoxTD).append($nameTD).append($descrptionTD)
				.append($delTD).append($updateTD);
				
			$("#usertable tbody").append($tr);
		}
	});
}
