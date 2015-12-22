# taxonomy-jquery

Simple and mobile-friendly UI for tag assignment. 

You can add new or select previously defined tags. This approach provides an alternative to the typeahead implementation by instead displaying all available tags to the user.

## Demo

You can [see it live here](http://fcosrno.github.io/taxonomy-jquery).

## Features
* Displays all tags, active or inactive, for easy toggling (no typeahead)
* Automatic duplication avoidance
* Mobile-friendly
* Multiple tag containers

## Setup

Install with Bower.

	bower install taxonomy-jquery

Include jQuery and the library before the closing body tag.

	<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="bower_components/taxonomy-jquery/dist/taxonomy-jquery.min.js"></script>
	

Maybe add a little CSS.

	<style>
		.tag-cloud li {margin:3px;padding:10px;font-size:1em;cursor: pointer;}
		.tag-active{background-color:red;}
		.tag-undo{color:#fff;margin-left:10px}
		.tag-undo:hover{color:#fff}
	</style>
		
		
## Usage
	
List your tags inside a form element.

	<form action="#">
		<ul id="tag-cloud">
			<li>First Tag</li>
			<li>Second Tag</li>
			<li>Third Tag</li>
		</ul>
	</form>
	
If you want a tag to be pre-selected, give it the `tag-active` class.

	...
		<li class="tag-active">Pre-selected Tag</li>
	...

Then assign the plugin to your list.

	<script>
		$('#my-tags').taxonomy_jquery();
	</script>

Your list will be converted into a Bootstrap-friendly "tag cloud". Each tag will be clickable and the user will be able to add new tags. A "Create a tag" button is automatically prepended to the top of the list. Your list will now look like this.

	<ul class="tag-cloud list-inline">
		<li class="label label-default tag-create">+ Create a tag</li>
		<li class="label label-default tag tag-active" data-tag-slug="first%20tag">First Tag</li>
		<li class="label label-default tag tag-active" data-tag-slug="second%20tag">Second Tag</li>
		<li class="label label-default tag tag-active" data-tag-slug="third%20tag">Third Tag</li>
		<li class="tag-active label label-default tag" data-tag-slug="pre-selected%20tag">Pre-selected Tag</li>
	</ul>


Active tags that the user selects or adds will be appended to the form as part of the input array `taxonomy-new-tags[]`. So, expanding on the example above, if all tags are clicked, the HTML will look something like this. Notice the hidden input fields.

	<form action="#">
		<ul class="tag-cloud list-inline">
			...
		</ul>
		<input type="text" name="taxonomy-new-tags[]" value="Pre-selected Tag">
		<input type="text" name="taxonomy-new-tags[]" value="First Tag">
		<input type="text" name="taxonomy-new-tags[]" value="Second Tag">
		<input type="text" name="taxonomy-new-tags[]" value="Third Tag">
	</form>

When you submit the form, you can get the selected tags by accessing `taxonomy-new-tags`.

## Options

You can override defaults by passing in a string literal on instantiation. Here is a list of default options followed by examples of the most used.

	tagClass:'.tag',
	tagClasses:'label label-default',
	tagActiveClass:'.tag-active',
	tagCreateClass:'.tag-create',
	tagUndo:'.tag-undo',
	tagSlugData:'data-tag-slug',
	addInput:'#tag-cloud-input',
	hiddenFieldName:'taxonomy-new-tags[]',
	undoCharacter:'X',
	createButton:true
        createButtonPositon:'first'

### hiddenFieldName

By default all selected tags will be appended to the form as `taxonomy-new-tags[]`. You can override this with the `hiddenFieldName` option. This is especially useful if you have two taxonomies under the same form. Please note the name needs to end in array brackets.

	<script>
		$('#my-tags').taxonomy_jquery({hiddenFieldName:'my-tags[]'});
		$('#my-other-tags).taxonomy_jquery({hiddenFieldName:'my-other-tags[]'});
	</script>

### createButton

If you want to hide the "Create a tag" button, make this option false. This is useful if you want to manage tag creation elsewhere.

If you want to put the "Create a tag" button at the end of the list, set `createButtonPosition` to `true`. 

## CSS Elements

You can customize the following class elements in your CSS to make this library look more like your needs.

### tag

Class assigned to each list item in the tag cloud.

### tag-active

Class assigned to tags that are selected or added.

### tag-create

Class assigned to the "Create a tag" button.

### tag-undo

Class assigned to the anchor in the newly created tag. This is the link the user clicks to delete the tag.

## Similar Plugins
* [https://github.com/bastianallgeier/Tags](https://github.com/bastianallgeier/Tags)
* [https://github.com/PebbleRoad/taxonomy-browser/tree/gh-pages](https://github.com/PebbleRoad/taxonomy-browser/tree/gh-pages)
* [https://github.com/max-favilli/tagmanager](https://github.com/max-favilli/tagmanager)

## Roadmap

**Version 0.0.3**

* Bugfix: Focus back to button on input backspace

**Version 0.2.0**

* Add typeahead for new tags to alert user on duplicate
* Customize settings like "Create a tag" button language
* Define form target where input array should go

**Version 0.3.0**

* Switch between other common UI styles in settings. We could have `mobile-friendly` (current) or `type-ahead`, which would be similar to [this](https://github.com/xoxco/jQuery-Tags-Input), [this](https://github.com/aehlke/tag-it), [this](https://github.com/max-favilli/tagmanager), or [this implementation](http://getkirby.com/blog/panel-tags-field/demo).

Example initialization:

	$('.my-list').taxonomy_jquery({
		'ui':'mobile-friendly',
		'style':'bootstrap3'
	});


**Version 1.0.0**

* Apply [these wonderful suggestions](http://www.reddit.com/r/reviewmycode/comments/2hymuf/jquery_code_review_my_opensourced_plugin/)
* Maybe change `taxonomy-new-tags[]` to `selected-tags[]`
* Add a parent dropdown to organize tags. Maybe use the Adjacency List Model design pattern for hierarchical data (read below), although this could complicate tags too much.
* Improve code with a more standard plugin pattern? Helpful resources:
	- [http://jqueryboilerplate.com/](http://jqueryboilerplate.com/)
	- [https://github.com/jquery-boilerplate/jquery-boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate)
	- [https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/jQuery-boilerplate-and-demo](https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/jQuery-boilerplate-and-demo)
	- [http://learn.jquery.com/plugins/basic-plugin-creation/](http://learn.jquery.com/plugins/basic-plugin-creation/)
	- [http://learn.jquery.com/plugins/](http://learn.jquery.com/plugins/)
	- [http://www.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/](http://www.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/)		


## Other topics

###Schema for Adjacency List Model design pattern

Taxonomy is a list constructed from individual Taxons. Every taxonomy has one special taxon, which serves as a root of the tree. All taxons can have many child taxons, you can define as many of them as you need.

A good examples of taxonomies are “Categories” and “Brands”. Below you can see an example tree. In the first branch, Categories and T-Shirts are taxons while Men and Women are taxonomies.

	| Categories
	|--  T-Shirts
	|    |-- Men
	|    `-- Women
	|--  Stickers
	|--  Mugs
	`--  Books
	
	| Brands
	|-- SuperTees
	|-- Stickypicky
	|-- Mugland
	`-- Bookmania
		
This library may aim to use the Adjacency List Model design pattern for hierarchical data, which represents a tree structure through a column referring to its parent node.

This would be a recommended database structure:

	CREATE TABLE `prefix_taxons` (
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `name` varchar(75) NOT NULL,
	  `slug` varchar(75) NOT NULL,
	  `parent` int(11) NOT NULL,
	  `root` int(11) NOT NULL,
	  `updated_at` timestamp NULL DEFAULT NULL,
	  `created_at` timestamp NULL DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;



