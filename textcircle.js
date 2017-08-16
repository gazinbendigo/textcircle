
this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient){
	

	Template.editor.helpers({
		docid: function() {
			var doc = Documents.findOne();
			if(doc) {
				//Dont act on an id that isnt there.
				return doc._id;
			}
			else {
				return undefined;
			}
		},
        config: function() {
			return function(editor){
				//set an event listener on the editor
				editor.on("change", function(cm_editor, info){
					//Use jquery to find the iframes dom and then inject the contents of
					//cm_editor into the iframe
					$("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
				});
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