var $ = require("jquery");
var _ = require("underscore");
var Yoo = require("../yoo");
var User = require("../user");

var Backbone = require("backbone");

var YooView = Backbone.View.extend({
  template: _.template($('#tmpl-yoo-view').html()),
  timestamp : 0,
  render: function() {
    console.log('render yoo');
  	this.$el.html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
  	var ts = this;
  	Yoo.getyoos(0, function(results){
  		var res = ts.clear(results);
  		console.log("res"+res);
  		var data = {};
  		data.yoos = res;
      data.times = ts.times(results);
  		data.avatar = User.avatar;
  		ts.$el.html(ts.template(data));
  	}, function(error){
  		console.log(error);
  	});
  },
  trigger: function() {
    var date = new Date();
    if(date.valueOf() - this.timestamp > 60000){
    	this.timestamp = date.valueOf();
    	this.render();
    }
  }, 
  clear : function(results){
  	var username = {};
  	var res = [];
  	for(var i in results){
  		var name = results[i].get("fromUser").get("username");
  		if(name && !username[name]){
  			username[name] = true;
  			res.push(results[i]);
  		}
  	}
  	return res;
  },
  times : function(results){
    var username = {};
    for(var i in results){
      var name = results[i].get("fromUser").get("username");
      if(name && !username[name]){
        username[name] = 1;
      }else{
        username[name]++;
      }
    }
    return username;
  }
})

module.exports = YooView;
