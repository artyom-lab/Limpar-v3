$(document).ready(function() {

	$("#sandwich-1").on("click", function(){
		$(this).toggleClass("active");
		$("body").toggleClass("menubar-1");
		window.dispatchEvent(new Event('resize'));
	});

  $('.search').on('click', function() {
    $(this).parent().toggleClass('open');
  });


  $(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) { 
    e.stopPropagation();
  });

	Waves.attach('.wave', ['waves-light']);
	Waves.attach('.wave2', ['waves-dark']);
	Waves.init();

	$(`[data-index=1]`).focus();

	$('.verify-input-field').keypress(function(e){
	  let inputBoxIndex = $(e.target).attr('data-index');
	  let inputBox = $(e.target);
	  
	  if(inputBox.val().length > 0) {
	    e.preventDefault();
	  }
	})

	$('.verify-input-field').keyup(function(e){
	  
	  checkInput();
	  
	  let inputBoxIndex = $(e.target).attr('data-index');
	  let pressedKeyCode = e.keyCode | e.which;
	  let nextInputBox = $(`[data-index=${Number(inputBoxIndex) + 1}]`);
	  let prevInputBox = $(`[data-index=${Number(inputBoxIndex) - 1}]`);
	  
	  if(pressedKeyCode !== 8 && pressedKeyCode !== 37 && pressedKeyCode !== 9 && pressedKeyCode !== 16  && nextInputBox.val().length === 0 || pressedKeyCode === 39) {
	    nextInputBox.focus();
	  } else if(pressedKeyCode === 8 || pressedKeyCode === 37) {
	    prevInputBox.focus();
	  }
	    
	})

	function checkInput() {
	  let finalInput = '';
	  for(i=1; i<=5; i++) {
	    let thisInput = $(`[data-index=${i}]`).val();
	    finalInput = finalInput + thisInput.toString();
	  }
	  
	  if (finalInput === '23f34') {
	    $('.verify-input-field').addClass('verified');
	  } else {
	    $('.verify-input-field').removeClass('verified');
	  }
	}

	var demo1 = new DragonDrop(document.getElementById('demo-1'), {
	  handle: '.handle',
	  announcement: {
	    grabbed: function (el) { return el.querySelector('span').innerText + ' grabbed'; },
	    dropped: function (el) { return el.querySelector('span').innerText + ' dropped'; },
	    reorder: function (el, items) {
	      var pos = items.indexOf(el) + 1;
	      var text = el.querySelector('span').innerText;
	      return 'The rankings have been updated, ' + text + ' is now ranked #' + pos + ' of ' + items.length;
	    },
	    cancel: function() { return 'Reranking cancelled.'; }
	  }
	});

	var demo2 = new DragonDrop(document.getElementById('demo-2'), {
	  handle: '.handle',
	  announcement: {
	    grabbed: function (el) { return el.querySelector('span').innerText + ' grabbed'; },
	    dropped: function (el) { return el.querySelector('span').innerText + ' dropped'; },
	    reorder: function (el, items) {
	      var pos = items.indexOf(el) + 1;
	      var text = el.querySelector('span').innerText;
	      return 'The rankings have been updated, ' + text + ' is now ranked #' + pos + ' of ' + items.length;
	    },
	    cancel: function() { return 'Reranking cancelled.'; }
	  }
	});

	demo1, demo2
	  .on('grabbed', function (container, item) { console.log('grabbed: ', item); })
	  .on('dropped', function (container, item) { console.log('dropped: ', item); })
	  .on('reorder', function (container, item) { console.log('reorder: ', item); })
	  .on('cancel', function () { console.log('Reordering cancelled'); });

	$('#all').on('click', function() {
		if ($('input[name="step"]:checked').length == $('input[name="step"]').length)
			$('input[name="step"]').prop('checked', false);
		else
			$('input[name="step"]').prop('checked', true);
	});

	$('.switch-wrap-box input').on('click', function() {
			$('.mens-team').toggleClass('hide');
			$('.womens-team').toggleClass('show');
	});

	$('.cross').on('click', function() {
			$(this).parent().closest('.delete-element').hide();
	});

	$('.select-beast').selectize({});

// SELECT2

(function($) {
  var Defaults = $.fn.select2.amd.require('select2/defaults');
  $.extend(Defaults.defaults, {
    dropdownPosition: 'auto'
  });
  var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');
  var _positionDropdown = AttachBody.prototype._positionDropdown;
  AttachBody.prototype._positionDropdown = function() {
    var $window = $(window);
    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
    var newDirection = null;
    var offset = this.$container.offset();
    offset.bottom = offset.top + this.$container.outerHeight(false);
    var container = {
        height: this.$container.outerHeight(false)
    };
    container.top = offset.top;
    container.bottom = offset.top + container.height;
    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };
    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };
    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);
    var css = {
      left: offset.left,
      top: container.bottom
    };
    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;
    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }
    var parentOffset = $offsetParent.offset();
    css.top -= parentOffset.top
    css.left -= parentOffset.left;
    var dropdownPositionOption = this.options.get('dropdownPosition');
    if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
      newDirection = dropdownPositionOption;
    } else {
      if (!isCurrentlyAbove && !isCurrentlyBelow) {
        newDirection = 'below';
      }
      if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
        newDirection = 'above';
      } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
        newDirection = 'below';
      }
    }
    if (newDirection == 'above' ||
    (isCurrentlyAbove && newDirection !== 'below')) {
        css.top = container.top - parentOffset.top - dropdown.height;
    }
    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }
    this.$dropdownContainer.css(css);
  };
})(window.jQuery);

	$(document).ready(function() {
	  $("select.select2").select2({
	    dropdownPosition: 'below'
	  });
		$("select.search-hide").select2({
			minimumResultsForSearch: Infinity,
		});

	});

	$('#artem select').on('change', function () {
		var val = $(this).find('option').attr('value');
		$('.artem .form-refine-select').each(function(e) {
			$(this).hide();
			if (e == val)
				$(this).show();
		})
	});

	$('.section-teams-hide select').on('change', function () {
		$(this).closest('.box-search').next().show();
		$(this).closest('.box-search').find('.cross-bigger').show();
	});

	$('.section-teams-hide .cross-bigger').on('click', function() {
		$(this).siblings('.select-box').find('select').find('option:first-child').attr("selected", false).attr("selected", true).change();
		$(this).closest('.box-search').nextAll().find('select').find('option:first-child').attr("selected", false).attr("selected", true).change();
		$(this).closest('.box-search').nextAll().hide();
		$(this).hide();
		$(this).closest('.box-search').nextAll().find('.cross-bigger').hide();
	});

// CALENDAR

	var start = moment("05/12/2021"),
	    end   = moment("06/11/2028");

	function cb(start, end) {
	    $('#reportrange').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	};

	$('#reportrange').daterangepicker({
	    startDate: start,
	    endDate: end,
	}, cb);

	cb(start, end);

	$('input[name="birthday1"], input[name="birthday2"]').daterangepicker({
	  singleDatePicker: true,
	  showDropdowns: true,
	  minYear: 2000,
	  maxYear: parseInt(moment().format('YYYY'),10)
	});

});

