/*
 * Programmed by Chris Burkhardt @ http://www.liquidmindcreative.com
 */
$(document).ready(function() 
{
	CloudZoom.quickStart();
	  
	$(".fancybox").fancybox({
		openEffect : 'elastic',
	    helpers : 
	    {
	        title : null            
	    },           
	    afterLoad: function() {
	        this.content.find('.inner-thumb').CloudZoom();                    // Create Cloud Zoom on open.
	    },
	    beforeClose: function(){
	        this.content.find('.inner-thumb').data('CloudZoom').destroy();    // Destroy Cloud Zoom on close.
	    }
	});
   
	/* ================ INIT THE PAGE TURN FUNCTIONALITY ================ */
	// The height and width are of the pages inside the book, not the whole book
	$('#magazine').turn(
	{
		elevation: 50,
	    width: 1540	,
	    height: 517,
	    duration: 1200,
	    autoCenter: false,
		gradients: true,
		when: 
		{
			// prevents a user from clicking another navigation button before the
			// page animation turn has completed
			turning: function(event, page, pageObject) 
			{
				$('.navigation_left li a').unbind('click', navigationClickHandler);
			},
			turned: function(event, page, pageObj) 
			{
				updateNavOnPagePeel(page);
				$('.navigation_left li a').bind('click', navigationClickHandler);
			}
		}
	});
	
	/*
	 * Leave some time for the code to initialize, then fade the book in
	 */
	setTimeout(function(){ $('.mag_wrapper').fadeTo(500,1);},1000);
	
	
	/* ============================== NAVIGATION METHODS ARE BELOW ===================================== */
	/* ================================================================================================= */
	
	/* ================ KEYBOARD NAVIGATION RIGHT AND LEFT ================ */
	/* TODO: reimplement. Temp disabled because nav doesnt highlight page you are on when using keyboard. 
	 * If we have time, we can implement this feature
	 * 
	$(window).bind('keydown', function(e)
	{
		// listen for arrow keys
		if (e.keyCode == 37){
			$('#magazine').turn('previous');
		}
		else if (e.keyCode==39){
			$('#magazine').turn('next');
		}

	});*/
	
	/* ============ MAIN NAVIGATION CLASSES FOR CSS ============== */
	var navItems = [[".table_of_contents"],
					[".magical_artifacts"], 
					[".for_young_wizard"],
					[".essential_wizard_assortment"],
					[".houses_of_hogwarts"],
					[".dark_arts"],
					[".the_wizarding-world"],
					[".special_collection"],
					[".the_experience_continues"]];
						  
	
	/* =============================== N ===================================== */
	/*
	 * This function is necessary to handle when a user DOES NOT use the navigation above the book. If the user
	 * peels a page from the corner, there is no navigation event, so we need to listen for the TURNED page event
	 * in the $('#magazine').turn function so we can update the navigation AFTER the page turn is completed. The 
	 * navigation item of the current page is then switched to its highlighted (selected) state and all other nav 
	 * items are reset. 
	 */
	function updateNavOnPagePeel(currentPageNumber)
	{
		switch(currentPageNumber)
		{
			case 2:  updateNavigationItems(".table_of_contents", "0", "-57"); 
			break;
			case 4:  updateNavigationItems(".magical_artifacts", "0", "-47"); 
			break;
			case 6:  updateNavigationItems(".for_young_wizard", "0", "-49"); 
			break;
			case 8:  updateNavigationItems(".essential_wizard_assortment", "0", "-56"); 
			break;
			case 10: updateNavigationItems(".houses_of_hogwarts", "0", "-57"); 
			break;
			case 12: updateNavigationItems(".dark_arts", "0", "-58"); 
			break;
			case 14: updateNavigationItems(".the_wizarding-world", "0", "-63"); 
			break;
			case 16: updateNavigationItems(".special_collection", "0", "-58"); 
			break;
			case 18: updateNavigationItems(".the_experience_continues", "0", "-39"); 
			break;

			// TODO: ADD A CASE FOR THE FINAL PAGE ONCE WE KNOW HOW MANY PAGES THERE WILL BE!
		}	
	};	
		
	/* ============================== Table of Contents Click =============================== */	
	/*
	 *	The DOM is constructed to display contents of only six pages in the animated book.
		So when I was trying to bind events to the links in other pages, the DOM wasnt recognizing them. 
		In order for the DOM to see page spreads and recognize the links, you have to use .live for real time
		checking. So this: $(".table_of_contents_navigation li a").click(function()
				  Became this: $(".table_of_contents_navigation li a").live('click',function()
	 * */
	$(".table_of_contents_navigation li a").live('click',function()
	{
		doNavigationChange($(this).attr("page"));
	});
	
	
	
	/* =============================== Main Navigation Click ===================================== */
	var navigationClickHandler = function() 
	{
	  	doNavigationChange($(this).attr("page"));
	};
	
	$(".navigation_left li a").click('click', navigationClickHandler);

	
	/* ======= PAGE TURNING AND NAVIGATION RESET (used by both the Table of Contents page, and the Main Navigation) ========== */
	/* The book is a spread of pages so when we turn to a page: Nav item 1 is page 2, Nav item 2 is page 4, etc...
	 * The count of the pages is based on the left side of the book and always even, but we only see the right side of the book.
	 * What this method does is it pulls the page attribute from the navigation item clicked and uses it in the switch
	 * to turn to a corresponding page, while also updating the background positions in CSS of the navigation item. */
	function doNavigationChange(pageToTurnTo)
	{
		switch(pageToTurnTo)
		{
			case '1': animatePageFlipsAndTurnToDesiredPage(2);
					  updateNavigationItems(".table_of_contents", "0", "-57");
			break;
			case '2': animatePageFlipsAndTurnToDesiredPage(4); 
					  updateNavigationItems(".magical_artifacts", "0", "-47");
			break;
			case '3': animatePageFlipsAndTurnToDesiredPage(6); 
					  updateNavigationItems(".for_young_wizard", "0", "-49");
			break;
			case '4': animatePageFlipsAndTurnToDesiredPage(8); 
					  updateNavigationItems(".essential_wizard_assortment", "0", "-56");
			break;
			case '5': animatePageFlipsAndTurnToDesiredPage(10);
					  updateNavigationItems(".houses_of_hogwarts", "0", "-57");
			break;
			case '6': animatePageFlipsAndTurnToDesiredPage(12);
					  updateNavigationItems(".dark_arts", "0", "-58");
			break;
			case '7': animatePageFlipsAndTurnToDesiredPage(14);
					  updateNavigationItems("..the_wizarding-world", "0", "-63"); 
			break;
			case '8': animatePageFlipsAndTurnToDesiredPage(16);
					  updateNavigationItems(".special_collection", "0", "-58");
			break;
			case '9': animatePageFlipsAndTurnToDesiredPage(18);
					  updateNavigationItems(".the_experience_continues", "0", "-39");
			break;
			// TODO: ADD A CASE FOR THE FINAL PAGE ONCE WE KNOW HOW MANY PAGES THERE WILL BE!
		}
	}
	
	/*
	 * Calls a method to reset all navigation items and updates the currently selected navigation
	 * item so it shows the highlighted state.
	 */
	function updateNavigationItems(currentNavDivClass, bgCoord1, bgCoord2)
	{
		resetNavigationItems(currentNavDivClass);
		$(currentNavDivClass).css("background-position", bgCoord1 + 'px ' + bgCoord2 + 'px');
	}
	
	/*
	 * Resets background positions in CSS for all nav items except the current one 
	 */
	function resetNavigationItems(currentNavItem)
	{
		$.each(navItems, function(index, item) 
		{
			if ( item[0] != currentNavItem )
			{
				// the class name of the nav item that will have its CSS changed (i.e. .for_young_wizard, .dark_arts)
				var navItem = item[0];

				// grabs the first set of coordinates from the map (the normal state of the nav item, not highlighted)
				//var resetBgPos = navItems[index][1] + 'px ' + navItems[index][2] + 'px';
				
				// updates the navigation items CSS
				$(navItem).css("background-position", "0px 0px");
				
				// We must remove the style attribute that was added by jQuery so 
				// the hover state in CSS is able to be used again. Since jQuery's style
				// is added AFTER the CSS style hover, it overwrites the CSS hover definition.
				// This fixes it!
				$(navItem).removeAttr('style');
			}
		});
	}
	
	/*
	 * The client requested that multiple page flips be shown while the book was turning. This method
	 * handles that functionality. To summarize, it checks the amount of pages between the current page
	 * the user is on, and where they want to go, and turns page after page until it reaches the 
	 * desired page location that the user selected.
	 */
	function animatePageFlipsAndTurnToDesiredPage(desiredPageLocation)
	{
		var pageTurnSpeed = 400; 
		var currPageNumber = $('#magazine').turn('page');
		var numberOfPagesToDesiredPage = (desiredPageLocation - $('#magazine').turn('page')) / 2; // divide by 2 for spread pages
		
		// If the page the user wants to turn to is BEFORE the current page (TO THE LEFT)
		 if ( numberOfPagesToDesiredPage < 0 )
		 {
		  	function increment() 
		  	{ 
		  		// while the current page is greater than the desired page, turn
		  		if ( currPageNumber > (desiredPageLocation+1) )
		  		{
		  			$('#magazine').turn('previous');
		  			currPageNumber = $('#magazine').turn('page');
		  		} 
		  		// when we have reached our desired page, clear the interval and turn to it
		  		else
		  		{
		  			clearInterval(interval);
		  			$('#magazine').turn('page', desiredPageLocation);
		  		}
		  	} 
		  	interval = setInterval(increment, pageTurnSpeed);
		  	
		 }	
		 // If the page the user wants to turn to is AFTER the current page (TO THE RIGHT)
		 else
		 {
		  	function increment() 
		  	{ 
		  		// while the current page is less than the desired page, turn
		  		if ( currPageNumber < desiredPageLocation )
		  		{
		  			$('#magazine').turn('next');
		  			currPageNumber = $('#magazine').turn('page');
		  		} 
		  		// when we have reached our desired page, clear the interval and turn to it
		  		else
		  		{
		  			clearInterval(interval);
		  			$('#magazine').turn('page', desiredPageLocation);
		  		}
		  	} 
		  	interval = setInterval(increment, pageTurnSpeed);
		 }
	}
	
	
	/* ============================== Price Tag Mouseover Functions =============================== */
	/*
	 * These methods trigger price tag hovers when the product is completely disconnected 
	 * from the price tag in the layout of the page. (Did this quick on last day of deadline)
	 */
	$(".wandPriceTagTrigger").live(
	{
		mouseenter:
           function(){ $(".left_wands").find('.wands_price a').css("background-position", "0px -27px"); },
        mouseleave:
           function(){ $(".left_wands").find('.wands_price a').css("background-position", "0px 0px"); }	
	});
		  
	$(".artefactPriceTagTrigger").live(
	{
		mouseenter:
           function(){ $(".artefact_boxes").find('.artefact_box_price').css("background-position", "0px -27px"); },
        mouseleave:
           function(){ $(".artefact_boxes").find('.artefact_box_price').css("background-position", "0px 0px"); }	
	});
	
	$(".trainPriceTagTrigger").live(
	{
		mouseenter:
           function(){ $(".hogwarts_express").find('.hogwarts_price_tag').css("background-position", "0px -26px"); },
        mouseleave:
           function(){ $(".hogwarts_express").find('.hogwarts_price_tag').css("background-position", "0px 0px"); }	
	});
	
	$(".augmentedshirt1").live(
	{
		mouseenter:
           function(){ $(".hottopic_left").find('a.augmentedprice1').css("background-position", "0px -27px"); },
        mouseleave:
           function(){ $(".hottopic_left").find('a.augmentedprice1').css("background-position", "0px 0px"); }	
	});
	
	$(".augmentedshirt2").live(
	{
		mouseenter:
           function(){ $(".hottopic_left").find('a.augmentedprice2').css("background-position", "0px -27px"); },
        mouseleave:
           function(){ $(".hottopic_left").find('a.augmentedprice2').css("background-position", "0px 0px"); }	
	});
	
	$(".printorium_img1").live(
	{
		mouseenter:
           function(){ $(".printorium").find('a.printorium_price').css("background-position", "0px -37px"); },
        mouseleave:
           function(){ $(".printorium").find('a.printorium_price').css("background-position", "0px 0px"); }	
	});
	
	$(".printorium_img2").live(
	{
		mouseenter:
           function(){ $(".printorium").find('a.printorium_price').css("background-position", "0px -37px"); },
        mouseleave:
           function(){ $(".printorium").find('a.printorium_price').css("background-position", "0px 0px"); }	
	});
});