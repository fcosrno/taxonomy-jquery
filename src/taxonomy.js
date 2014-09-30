// Initialize
var taxonomy_jquery = {};

// Elements
taxonomy_jquery.listClass='.taxonomy-cloud';
taxonomy_jquery.tagClass='.tag';
taxonomy_jquery.tagActiveClass='.tag-active';
taxonomy_jquery.tagCreateClass='.taxonomy-createTag';
taxonomy_jquery.tagSlugData='data-taxonomy-newSlug';
taxonomy_jquery.addInput='#taxonomy-cloud-input';
taxonomy_jquery.newTagsHiddenField='taxonomy-newTags[]';

// Containers
taxonomy_jquery.existingTags = [];
taxonomy_jquery.newTags = [];

/**
 * Factory for new tag. 
 * 
 * Takes tag string from the #taxonomy-cloud-input field and 
 * adds it to the new tags list, hidden form field and cloud.
 */
taxonomy_jquery.addInputTag = function(){
	// Remove comma from tag
	var tag = this.cutInputVal(this.addInput).replace(/^,|,$/g,'');
	// Then add it.
	if(this.addTag(tag,taxonomy_jquery.newTags) === true){
		// Add element to tag cloud
		var html = '<li class="label label-default '+taxonomy_jquery.tagClass.substr(1)+' '+taxonomy_jquery.tagActiveClass.substr(1)+'">'+tag+'<a href="#" class="tag-new-undo" '+taxonomy_jquery.tagSlugData+'="'+encodeURIComponent(tag)+'"><i class="fa fa-close"></i></a></li>';
		$(html).insertAfter($(taxonomy_jquery.tagCreateClass).parent());
		// Reset form array
		this.resetForm();
	}
};
/**
 * Refreshes the hidden form field with the current new tags.
 */
taxonomy_jquery.resetForm = function(){
	// Clear all
	$('input[name="'+this.newTagsHiddenField+'"]').remove();
	// Add to input
	var inputs = '';
	if(this.newTags.length > 0){
		$.each(this.newTags, function(key,value){
			inputs += '<input type="text" name="'+taxonomy_jquery.newTagsHiddenField+'" value="'+value+'">';
		});
	}
	// Insert at the end of the form using appendTo
	var currentForm =  $(this.listClass).closest("form");
	$(inputs).appendTo(currentForm);
};

/**
 * Removes new tag from list, hidden input field, and cloud. 
 * Triggered when user clicks on the 'x' in the new tag.
 *
 * @param {string} tag
 */
taxonomy_jquery.undoNewTag = function(tag){
	// Remove tag from array
	this.removeTag(tag,taxonomy_jquery.newTags);
	// Remove cloud element
	$("a["+taxonomy_jquery.tagSlugData+"='" + encodeURIComponent(tag) + "']").parent().remove();
	// Reset form
	this.resetForm();
};

/**
 * Remove tag from list.
 * 
 * @param {string} tag
 * @param {array} list
 * @return {boolean}	False if the tag was not removed.
 */
taxonomy_jquery.removeTag = function(tag,list){
	// Remove tag from array
	var index = list.indexOf(tag);
	if (index > -1) {
		list.splice(index, 1);
		return true;
	}else{
		return false;
	}
};
/**
 * Add tag to list, preventing duplicates.
 * 
 * @param {string} tag
 * @param {array} list
 * @return {boolean}	False if the tag was not added.
 */
taxonomy_jquery.addTag = function(tag,list){
	var in_array = list.indexOf(tag);
	if(in_array<0){
		// Set slug
		var tag_slug = encodeURIComponent(tag);
		// Push to array
		list.push(tag);
		return true;
	}else{
		return false;
	}
};

/**
 * Cuts the value from an input element.
 * 
 * @param  {selector} element The input field
 * @return {string}         The input value
 */
taxonomy_jquery.cutInputVal = function(element){
	// Grab value
	var inputVal = $(element).val();
	// Reset element
	$(element).val('');
	// Return value
	return inputVal;
};

