 (function($) {

  $.fn.taxonomy_jquery = function() {

    // Create object
    var taxonomy_jquery = {};

    // Define element vars
    taxonomy_jquery.listClass=this;
    taxonomy_jquery.tagClass='.tag';
    taxonomy_jquery.tagClasses='label label-default';
    taxonomy_jquery.tagActiveClass='.tag-active';
    taxonomy_jquery.tagCreateClass='.taxonomy-createTag';
    taxonomy_jquery.tagSlugData='data-taxonomy-tagSlug';
    taxonomy_jquery.addInput='#taxonomy-cloud-input';
    taxonomy_jquery.newTagsHiddenField='taxonomy-newTags[]';

    // Containers
    taxonomy_jquery.existingTags = [];
    taxonomy_jquery.newTags = [];
    taxonomy_jquery.activeTags = [];

    /////////////////////////////
    /// Logic methods.
    /// The heart of the plugin.
    /////////////////////////////

    /**
     * Initializes the plugin by adding elements to cloud.
     * 
     * @return {null}
     */
    taxonomy_jquery.init = function(){
      // Iterate through tag list
      taxonomy_jquery.listClass.find('li').each(function(){
        var tag = $(this).text();
        // Add classes to each list item  
        $(this).addClass(taxonomy_jquery.tagClasses+' '+taxonomy_jquery.tagClass.substr(1));
        // TODO Add slug to each list item, handy for element selection
        // $(this).data("foo","bar");
        // Store tag in array
        taxonomy_jquery.addTag(tag,taxonomy_jquery.existingTags);
      });
      // Add "Create Tag" button
       taxonomy_jquery.listClass.prepend('<li class="'+taxonomy_jquery.tagClasses+' '+taxonomy_jquery.tagCreateClass.substr(1)+'"><span class="fa fa-plus"></span> Create a tag</li>');
    };

    /**
     * Factory for new tag. 
     * 
     * Takes tag string from the #taxonomy-cloud-input field and 
     * adds it to the new tags list, active tags list, hidden form 
     * field and cloud.
     */
    taxonomy_jquery.addInputTag = function(){
      // Remove comma from tag
      var tag = this.cutInputVal(this.addInput).replace(/^,|,$/g,'');
      // Prevent duplicates
      if(taxonomy_jquery.inArray(tag,taxonomy_jquery.existingTags)){
        // TODO If it already exists, just toggle the activation
        // taxonomy_jquery.toggleTagActivation();
      }else{
        // Otherwise, add it.
        if(this.addTag(tag,taxonomy_jquery.newTags) === true){
          // Add element to tag cloud
          var html = '<li class="label label-default '+taxonomy_jquery.tagClass.substr(1)+' '+taxonomy_jquery.tagActiveClass.substr(1)+'">'+tag+'<a href="#" class="tag-new-undo" '+taxonomy_jquery.tagSlugData+'="'+encodeURIComponent(tag)+'"><i class="fa fa-close"></i></a></li>';
          $(html).insertAfter($(taxonomy_jquery.tagCreateClass));
          // Reset form array
          this.resetForm();
          // Add to active tags
          taxonomy_jquery.addTag(tag,taxonomy_jquery.activeTags);
        }
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
      // Remove tag from arrays
      this.removeTag(tag,taxonomy_jquery.newTags);
      this.removeTag(tag,taxonomy_jquery.activeTags);
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
     * @return {boolean}  False if the tag was not removed.
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
     * Handy function to see if a value is in an array.
     * @param  {string} string Needle
     * @param  {array} list   Haystack
     * @return {bool}
     */
    taxonomy_jquery.inArray = function(string,list){
      var in_array = list.indexOf(string);
      if(in_array<0)return false;
      else return true;
    };

    /**
     * Add tag to list, preventing duplicates.
     * 
     * @param {string} tag
     * @param {array} list
     * @return {boolean}  False if the tag was not added.
     */
    taxonomy_jquery.addTag = function(tag,list){
      if(taxonomy_jquery.inArray(tag,list)===false){
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

    /**
     * Toggles the tag on or off
     * @param  {object} element 
     * @return {null}
     */
    taxonomy_jquery.toggleTagActivation = function(element){
      // Check if tag is already active
      var tag  = element.text();
      if(element.hasClass(taxonomy_jquery.tagActiveClass.substr(1))){
        // If active, remove class
        element.removeClass(taxonomy_jquery.tagActiveClass.substr(1));
        // And remove from active tags list
        taxonomy_jquery.removeTag(tag,taxonomy_jquery.activeTags);
      }else{
        // Else, activate
        element.addClass(taxonomy_jquery.tagActiveClass.substr(1));
        // Add to active tags
        taxonomy_jquery.addTag(tag,taxonomy_jquery.activeTags);
      }
    };

    /////////////////////////////
    /// jQuery functions
    /// Straightforward DOM manipulation sugar.
    /////////////////////////////

    /**
     * Display "Create a tag" input field
     * @return {bool} false
     */
    $(taxonomy_jquery.listClass).on('click',taxonomy_jquery.tagCreateClass,function(){
      // Show tag input field to add tags
      if($(taxonomy_jquery.addInput).length===0){
        var html = '<div class="form-group"><input id="'+taxonomy_jquery.addInput.substr(1)+'" type="text" class="form-control" placeholder="Add tags separated by a comma..."></div>';
        $(html).insertBefore($(taxonomy_jquery.listClass));
      }
      return false;
    });

    /**
     * Toggle style for active tag
     * @return {bool} false
     */
    $(taxonomy_jquery.listClass).on('click',taxonomy_jquery.tagClass,function(){
      taxonomy_jquery.toggleTagActivation($(this));
      return false;
    });

    /**
     * Add new tag.
     */
    $(taxonomy_jquery.listClass).parent().on("keyup",taxonomy_jquery.addInput, function(){
      // TODO listen for enter and tab
      if(event.keyCode == 188 || event.keyCode == 9 || event.keyCode == 13){
        taxonomy_jquery.addInputTag();
      }
      return false;
    });

    /**
     * Undo new tag.
     */
    $(taxonomy_jquery.listClass).on('click','.tag-new-undo',function(){
      taxonomy_jquery.undoNewTag($(this).parent().text());
    });

    // And... launch!
    taxonomy_jquery.init();

  };
})(jQuery);