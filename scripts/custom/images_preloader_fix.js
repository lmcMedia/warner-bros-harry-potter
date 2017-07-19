/*
 * Programmed by Chris Burkhardt @ http://www.liquidmindcreative.com
 */
$(document).ready(function() {

	// 
	// 
	/* The preloader takes care of loading all img's and CSS background images, but 
	 * the images for the zoom function in the pop up are of type HREF and are not
	 * loaded by the preloader. So we need a way to load those so the user doesnt 
	 * have to wait to see them on the popup
	 */
	var paths = [ 
				 // background images
				 'images/background/background.png',
				 'images/background/book_bg.jpg',
				 'images/background/front_cover_back.jpg',
				 'images/background/front_cover_full.jpg',
				 'images/background/inner_page_bg.png',
				 'images/background/inner_page_frame.png',
				 'images/background/page_left.jpg',
				 'images/background/page_right.jpg',
				 'images/background/site_bg.jpg',
				 'images/background/wands_bg.png',
				 'images/background/zoomloader.gif',
				 'images/pages/page_final.jpg',
				 // header
				 'images/header/dark_arts.png',
				 'images/header/essential_wizard.png',
				 'images/header/experience_continues.png',
				 'images/header/houses_of_hogwarts.png',
				 'images/header/logo.png',
				 'images/header/magical_artefacts.png',
				 'images/header/nav_start.png',
				 'images/header/special_collection.png',
				 'images/header/table_of_contents.png',
				 'images/header/the_exhibition.png',
				 'images/header/wizarding_world.png',
				 'images/header/young_wizard.png',
				 // large images	
				 'images/popup/magical/wands/wand1_large.jpg',
				 'images/popup/magical/wands/wand2_large.jpg',
				 'images/popup/magical/wands/wand3_large.jpg',
				 'images/popup/magical/wands/wand4_large.jpg', 
				 'images/popup/magical/golden_snitch_large.jpg',
				 'images/popup/magical/hermiones_artefact_box_large.jpg',
				 'images/popup/magical/hermiones_bag_large.jpg',
				 'images/popup/magical/marauders_map_large.jpg',
				 'images/popup/magical/time_turner_larger.jpg',
				 'images/popup/magical/train_set_large.jpg',
				 'images/popup/magical/triwizard_cup_large.png',
				 'images/popup/young_wizard/big_images/hp_costume_large.jpg',
				 'images/popup/young_wizard/big_images/hp_eyeglasses_large.jpg',
				 'images/popup/young_wizard/big_images/hp_wand_pen_bookmark_large.jpg',
				 'images/popup/young_wizard/big_images/kubrick_figures_large.jpg',
				 'images/popup/young_wizard/big_images/lego_hp_hogwarts_crest_shirt_large.jpg',
				 'images/popup/young_wizard/big_images/lego_hp_magical_world_large.jpg',
				 'images/popup/young_wizard/big_images/muggle_shirt_large.jpg',
				 'images/popup/young_wizard/big_images/personal_acceptance_letter_large.jpg',
				 'images/popup/young_wizard/big_images/spectrespecs_eyeglasses_large.jpg',
				 'images/popup/essential_wizard/big_images/deathly_hallows_journal_large.jpg',
				 'images/popup/essential_wizard/big_images/final_battle_ornament_large.jpg',
				 'images/popup/essential_wizard/big_images/hogwardt_ornament_set_large.jpg',
				 'images/popup/essential_wizard/big_images/hot_topic_hoodie_large.jpg',
				 'images/popup/essential_wizard/big_images/hot_topic_tshirt_seen_wizard_large.jpg',
				 'images/popup/essential_wizard/big_images/hot_topic_tshirt_undesirable_large.jpg',
				 'images/popup/essential_wizard/big_images/hp_deathly_hallow_ultimate_edition_large.jpg',
				 'images/popup/essential_wizard/big_images/hp_film_digital_app_large.jpg',
				 'images/popup/essential_wizard/big_images/hp_film_wizardry_book_large.jpg',
				 'images/popup/essential_wizard/big_images/hp_kinect_large.jpg',
				 'images/popup/essential_wizard/big_images/hp_wall_calendar_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwart_house_scarves_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwart_house_scarves_largeBAK.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwart_house_ties_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwarts_house_bookmark_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwarts_house_robes_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwarts_house_sweaters_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwarts_house_throws_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/hogwarts_iphone_cases_large.jpg',
				 'images/popup/house_of_hogwarts/big_images/house_beanies_large.jpg',
				 'images/popup/dark_arts/big_images/avada_kedavra_tee_large.jpg',
				 'images/popup/dark_arts/big_images/death_eather_mask_collection_large.jpg',
				 'images/popup/dark_arts/big_images/deluxe_death_eater_costume_large.jpg',
				 'images/popup/dark_arts/big_images/horcrux_bookmark_set_large.jpg',
				 'images/popup/dark_arts/big_images/horcrux_locket_large.jpg',
				 'images/popup/dark_arts/big_images/horcrux_ring_large.jpg',
				 'images/popup/dark_arts/big_images/voldemort_wand_pen_bookmark_large.jpg',
				 'images/popup/the_wizarding_world/big_images/bertie_bott_beans_large.jpg',
				 'images/popup/the_wizarding_world/big_images/chocolate_frogs_pack_large.jpg',
				 'images/popup/the_wizarding_world/big_images/griffindor_rugby_shirt_large.jpg',
				 'images/popup/the_wizarding_world/big_images/gryffindor_jersey_shirt_large.jpg',
				 'images/popup/the_wizarding_world/big_images/house_scarves_large.jpg',
				 'images/popup/the_wizarding_world/big_images/pumpkin_juice_large.jpg',
				 'images/popup/the_wizarding_world/big_images/pygmy_puff_large.jpg',
				 'images/popup/special_collection/big_images/dumbledore_doll_large.jpg',
				 'images/popup/special_collection/big_images/final_challenge_chess_set_large.jpg',
				 'images/popup/special_collection/big_images/gallery_statue_harry_large.jpg',
				 'images/popup/special_collection/big_images/gallery_statue_voldemort_large.jpg',
				 'images/popup/special_collection/big_images/hp_page_to_screen_large.jpg',
				 'images/popup/special_collection/big_images/hp_wizard_collection_large.jpg',
				 'images/popup/special_collection/big_images/printorium_II_large.jpg',
				 'images/popup/special_collection/big_images/printorium_large.jpg'
				 ];
	var i;
	var len = paths.length;
	var d = document; 
  	
  
  	// hidden div to store preloaded images so they dont have to load again
    var cont = $('<div style="overflow: hidden; width: 1px; height: 1px; position: absolute; margin-top: -1000px; margin-left: -1000px;"/>').appendTo($('body'));
    
	for(i = 0; i < len; i++) 
	{
		var path = paths[i];
		var img = d.createElement('img');
		img.src = path;
		cont.append(img);
	}
	
	
  $('body').jpreLoader({
    splashVPos: '100px',
    loaderVPos: '350px',    
    }
  );
});