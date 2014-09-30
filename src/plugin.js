 (function($) {
  ///////////////////////////////
  /// Plugin stuff
  //////////////////////////////
  $(taxonomy_jquery.listClass+' '+taxonomy_jquery.tagClass).click(function(){
    if($(this).hasClass(taxonomy_jquery.tagActiveClass.substr(1))){
      $(this).removeClass(taxonomy_jquery.tagActiveClass.substr(1));
    }else{
      $(this).addClass(taxonomy_jquery.tagActiveClass.substr(1));
    }
    return false;
  });
  $(taxonomy_jquery.listClass+' '+taxonomy_jquery.tagCreateClass).click(function(){
    // Show tag input field to add tags
    if($(taxonomy_jquery.addInput).length===0){
      var html = '<div class="form-group"><input id="'+taxonomy_jquery.addInput.substr(1)+'" type="text" class="form-control" placeholder="Add tags separated by a comma..."></div>';
      $(html).insertBefore($(taxonomy_jquery.listClass));
    }
    return false;
  });
  $(document).on('click','.tag-new-undo',function(){
    // undo new tag
    taxonomy_jquery.undoNewTag($(this).parent().text());
  });
  $(document).on("keyup",taxonomy_jquery.addInput, function(){
    // TODO listen for enter and tab
    if(event.keyCode == 188 || event.keyCode == 9 || event.keyCode == 13){
      taxonomy_jquery.addInputTag();
    }
    event.preventDefault();
  });
})(jQuery);