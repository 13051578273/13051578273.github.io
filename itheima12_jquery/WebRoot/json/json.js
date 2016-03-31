/**
 * json中的value可以是：
 *    数字类型,字符串类型,json,[],function
 */
var json1 = {};

var json2 = {
	name:'aaa',
	id:1,
	aaa:function(){
		alert("adsf");
	}
};


var json3 = {
	person:{
		id:1,
		name:'aa'
	}
};

var json4 = [
	{
		id:1,
		name:'aaa'
	},{
		id:2,
		name:'bbb'
	}
];

var json5 = {
	setPerson:function(){ //value为一个函数
		
	}
};

var json6 = {
	aaa:json4
};

/**
 * 遍历json
 */
for(var i in json2){
	/**
	 * i代表key值
	 */
	alert(i);
	/**
	 * json2[i]代表value值
	 */
	if(typeof json2[i] == "function"){//如果 value是一个function
		json2[i]();//调用该方法
	}else{
		alert(json2[i]);
	}
}

//查找json中的key,value的一种形式
alert("-------------"+json2["name"]);

//利用该方式可以给一个json动态的加入key,value
json2['asdf'] = 1;
alert(json2['asdf']);
