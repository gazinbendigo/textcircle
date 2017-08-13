
this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient){
	
	Meteor.setInterval(function(){
		Session.set("current_date", new Date());
	}, 1000);
	
	
	Template.date_display.helpers({
		current_date: function(){
			return Session.get("current_date");
		}
	});
	
	Template.editor.helpers({
		docid: function() {
			let doc = Documents.findOne();
			if(doc) {
				//Dont act on an id that isnt there.
				return doc._id;
			}
			else {
				return undefined;
			}
		}
	});
}

if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
		if(!Documents.findOne()){
			Documents.insert({title: "my first document"});
		}
	})
}