 (function($) {
  /**
   * Similar to text(), but without children elements.
   * Source: http://stackoverflow.com/a/20851691
   */
  $.fn.justtext = function() {
      var str = '';
      this.contents().each(function() {
          if (this.nodeType == 3) {
              str += this.textContent || this.innerText || '';
          }
      });
      return str;
  };
  $.fn.taxonomy_jquery = function(options) {

    // Accept options
    var taxonomy_jquery = $.extend({
      tagClass:'.tag',
      tagClasses:'label label-default',
      tagActiveClass:'.tag-active',
      tagCreateClass:'.tag-create',
      tagUndo:'.tag-undo',
      tagSlugData:'data-tag-slug',
      addInput:'#tag-cloud-input',
      newTagsHiddenField:'taxonomy-new-tags[]',
      undoCharacter:'X'
    }, options );

    // Define element vars
    taxonomy_jquery.listClass=this;

    // Containers
    taxonomy_jquery.existingTags = {};
    taxonomy_jquery.newTags = {};
    taxonomy_jquery.activeTags = {};

    /////////////////////////////
    /// Logic methods.
    /// The heart of the plugin.
    /////////////////////////////

    /**
     * Initializes the plugin by injecting properties to the list items.
     * 
     * @return {null}
     */
    taxonomy_jquery.init = function(){
      // Iterate through tag list
      taxonomy_jquery.listClass.find('li').each(function(){
        var tag = $(this).text();
        // Add to active array if item has "tag-active" class
        if($(this).hasClass('tag-active'))taxonomy_jquery.addTag(tag,taxonomy_jquery.activeTags);
        // Add classes to each list item  
        $(this).addClass(taxonomy_jquery.tagClasses+' '+taxonomy_jquery.tagClass.substr(1));
        // Add slug to each list item, handy for element selection
        $(this).attr(taxonomy_jquery.tagSlugData, taxonomy_jquery.toSlug(tag));
        // Store tag in array
        taxonomy_jquery.addTag(tag,taxonomy_jquery.existingTags);
      });
      // Add "Create Tag" button
      taxonomy_jquery.toggleInputField(false);
      // Reset form
      taxonomy_jquery.resetForm();
    };

    /**
     * Convert string to lowercase and url-safe string
     * @param  {string} string
     * @return {string}
     */
    taxonomy_jquery.toSlug = function(string){
      return encodeURIComponent(string).toLowerCase();
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
      if(taxonomy_jquery.inObject(tag,taxonomy_jquery.existingTags)){
        // If it already exists, toggle on (never off)
        taxonomy_jquery.toggleTagOn($('li['+taxonomy_jquery.tagSlugData+'="'+taxonomy_jquery.toSlug(tag)+'"]'));
      }else{
        // Otherwise, add it.
        if(this.addTag(tag,taxonomy_jquery.newTags) === true){
          // Add element to tag cloud
          var html = '<li class="label label-default '+taxonomy_jquery.tagClass.substr(1)+' '+taxonomy_jquery.tagActiveClass.substr(1)+'">'+tag+'<a href="#" class="'+taxonomy_jquery.tagUndo.substr(1)+'" '+taxonomy_jquery.tagSlugData+'="'+taxonomy_jquery.toSlug(tag)+'">'+taxonomy_jquery.undoCharacter+'</a></li>';
          $(html).prependTo(taxonomy_jquery.listClass);
          // Add to active tags
          taxonomy_jquery.addTag(tag,taxonomy_jquery.activeTags);
        }
      }
      // Reset form array
      this.resetForm();
    };

    /**
     * Refreshes the hidden form field with the current new tags.
     */
    taxonomy_jquery.resetForm = function(){
      // Clear all
      $('input[name="'+this.newTagsHiddenField+'"]').remove();
      // Add to input
      var inputs = '';
        $.each(this.activeTags, function(slug,tag){
          inputs += '<input type="hidden" name="'+taxonomy_jquery.newTagsHiddenField+'" value="'+tag+'">';
        });
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
      $("a["+taxonomy_jquery.tagSlugData+"='" + taxonomy_jquery.toSlug(tag) + "']")
      .parent(".tag")
      .remove();
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
      if(taxonomy_jquery.inObject(tag,list)){
        var slug = taxonomy_jquery.toSlug(tag);
        delete list[slug];
      }else return false;
    };

    /**
     * Handy function to see if a value is in an array.
     * @param  {string} string Needle
     * @param  {array} list   Haystack
     * @return {bool}
     */
    taxonomy_jquery.inObject = function(string,list){
      var slug = taxonomy_jquery.toSlug(string);
      if(!( slug in list))return false;
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
      var slug = taxonomy_jquery.toSlug(tag);
      if(!( slug in list)){
        // Push to array
        list[slug]=tag;
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
      taxonomy_jquery.resetForm();
    };

    /**
     * Extracted from toggleTagActivation.
     * @param  {object} element
     * @return {null}
     */
    taxonomy_jquery.toggleTagOn = function(element) {
        var tag  = element.text();
        // Add Class
        if(!element.hasClass(taxonomy_jquery.tagActiveClass.substr(1))){
          element.addClass(taxonomy_jquery.tagActiveClass.substr(1));
        }
        // Add to active tags
        taxonomy_jquery.addTag(tag,taxonomy_jquery.activeTags);
    };
    /**
     * Show or hide tags input field and "Create a tag" button
     * @param  {boolean} boolswitch
     * @return {null}
     */
    taxonomy_jquery.toggleInputField = function(boolswitch){
      // Define a default switch value
      if(boolswitch===undefined){
        if($(taxonomy_jquery.addInput).length===0)boolswitch = true;
        else boolswitch = false;
      }
      if(boolswitch===true){
        var html = '<div class="form-group"><input id="'+taxonomy_jquery.addInput.substr(1)+'" type="text" class="form-control" placeholder="Add tags separated by a comma..."></div>';
        $(html).insertBefore($(taxonomy_jquery.listClass));
        // Focus on input field
        $(taxonomy_jquery.addInput).focus();
        // Remove button
        $(taxonomy_jquery.tagCreateClass).remove();
      }else{
        // Remove field
        $(taxonomy_jquery.addInput).parent().remove();
        // Add button
        taxonomy_jquery.listClass.prepend('<li class="'+taxonomy_jquery.tagClasses+' '+taxonomy_jquery.tagCreateClass.substr(1)+'">+ Create a tag</li>');
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
      taxonomy_jquery.toggleInputField(true);
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
    $(taxonomy_jquery.listClass).parent().on("keydown",taxonomy_jquery.addInput, function(event){
      // listen for comma, enter or tab
      if(event.keyCode == 188 || event.keyCode == 9 || event.keyCode == 13){
        event.preventDefault();
        taxonomy_jquery.addInputTag();
      }
      // Listen for a blank value and backspace (8)
      if(event.keyCode == 8 && $(taxonomy_jquery.addInput).val().length===0){
        taxonomy_jquery.toggleInputField(false);
        return false;
      }
    });

    /**
     * Undo new tag.
     */
    $(taxonomy_jquery.listClass).on('click',taxonomy_jquery.tagUndo,function(){
      var tag = $(this).parent().justtext();
      taxonomy_jquery.undoNewTag(tag);
    });

    // And... launch!
    taxonomy_jquery.init();

  };
})(jQuery);