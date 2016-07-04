(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Mobile-Drag-And-Drop/
	// Feel free to use this jQuery Plugin
	
	// TODO: Pass these around as required, rather than having them at this level
	var currentDrag = "";
	var currentDrop = "";
	var targetSelector = "";
	var dragSelector = "";
	var statusSelector = "";
	var selectedClass = "";
	var activeClass = "";
	var ruleChecked = false;
	
	function IsValidDrop(id) {
		var returnValue = false;
		var currentDragParent = "#" + $(currentDrag).parent().attr("id");
		if (currentDragParent == id) {
			if (ruleChecked) {
				returnValue = true;
			} else {
				returnValue = false;
			}
		} else {
			returnValue = true;
		}
		// Prevents the rule from failing on the same item twice in a row
		ruleChecked = true;
		
		return returnValue;
	}

	function ProcessDragEvent(id) {
		
		// Set the currentDrag item
		currentDrag = id;
		ruleChecked = false;
		
		// Remove the selected class from all draggable items 
		// and add it to the current item
		$(dragSelector).removeClass(selectedClass);
		$(id).addClass(selectedClass);
		
		// Outputs the current draggable item onto the page
		if (statusSelector.length > 0) {
			$(statusSelector).find("#dragging").html(id);
		}
		
		// If the current draggable item isn't blank, highlight 
		// the droppable zones
		if (currentDrag.length > 1) {
			$(targetSelector).addClass(activeClass);
		}
	}
	
	function ProcessDropEvent(id) {
	
		if (IsValidDrop(id)) {
			// If the current draggable item isn't blank, we will
			// move the element and place it inside the target 
			// droppable element
			if (currentDrag.length > 1) {
				$(currentDrag).remove().prependTo(id);
				ProcessDragEvent("");
				if (statusSelector.length > 0) {
					$(statusSelector).find("#dropping").html(id);
				}
			}
			
			// Remove the highlighting of droppable zones
			$(targetSelector).removeClass(activeClass);
		}
	}
	
	function AddDropEvents() {
		// Adds drop events to droppable items
		$(targetSelector).live("mouseup", function () {
			var id = "#" + $(this).attr("id");
			ProcessDropEvent(id);
			return false;
		});
	}

	jQuery.fn.mobiledraganddrop = function (settings) {
	
		var config = {"targets": ".drop", "modifier": "mobiledraganddrop", "status": "", "selectedclass": "selected", "activeclass": "active"};

		if (settings) $.extend(config, settings);

		return this.each(function () {
			
			selectedClass = config.selectedclass;
			activeClass = config.activeclass;
			
			targetSelector = "." + config.modifier + "drop";
			$(config.targets).addClass(config.modifier + "drop");
			
			dragSelector = "." + config.modifier + "drag";
			$(this).addClass(config.modifier + "drag");
			
			statusSelector = config.status;
			if (statusSelector.length > 0) {
				$(statusSelector).html('<p>Dragging: <span id="dragging">&nbsp;</span><br>Dropping: <span id="dropping">&nbsp;</span></p>');
			}
			
			// Adds drag events to draggable items
			$(dragSelector).unbind("mousedown");
			$(dragSelector).live("mousedown", function() {
				var id = "#" + $(this).attr("id");
				ProcessDragEvent(id);
				return false;
			});
			
			AddDropEvents();
		});

	};
})(jQuery);