function select(){

    // Get the topics div
    let selected = document.getElementById("topics");

    // The previous selected percentage
    let old_p = selected_topic;

    // Change the percentage to the selected one
    selected_topic = selected.options[selected.selectedIndex].value;

    // Clears all Two type objects
    two.clear();

    // Change the rectangles every time a new topic is selected
    changeRectangles(rect1, rect2, rect3, old_p);
}

function createRectangles(rect1, rect2, rect3, first) {

    // Color the rectangles
    rect1.fill = '#60c403';
    rect1.stroke = '#067c50';
    rect2.fill = '#FFFF33';
    rect2.stroke = '#FFFF00';
    rect3.fill = '#ff0000';
    rect3.stroke = '#a50000';

    // Groups can take an array of shapes and/or groups.
    let group = two.makeGroup(rect1, rect2, rect3);
    // And have translation, rotation, scale like all shapes.
    group.translation.set(two.width / 4, two.height / 2);
    group.rotation = Math.PI;
    group.scale = 0.75;
    // Set the width of the lines of the rectangles
    group.linewidth = 7;

    // Only update in the first iteration
    if(first)
        two.update();
}

function changeRectangles(rect1, rect2, rect3, old_p) {
    // Get the previous percentages
    let old_pos_value = Math.round(pos_value);
    let old_neu_value = Math.round(neu_value);
    let old_neg_value = Math.round(neg_value);

    // Change the percentages
    pos_value = Math.round(dataset[selected_topic].positive);
    neu_value = Math.round(dataset[selected_topic].neutral);
    neg_value = Math.round(dataset[selected_topic].negative);

    // Change the percentage display
    positive.innerText = pos_value + "%";
    neutral.innerText = neu_value  + "%";
    negative.innerText = neg_value + "%";

    // If the difference between the new percentage and the previous one is positive, the bool is true
    let pos_bool = false;
    let neu_bool = false;
    let neg_bool = false;
    if(pos_value - old_pos_value > 0)
        pos_bool = true;
    if(neu_value - old_neu_value > 0)
        neu_bool = true;
    if(neg_value - old_neg_value > 0)
        neg_bool = true;

    // Create an event to update the rectangles
    two.bind('update', function(frameCount) {
        // Only update until the correct height is reached
        if((Math.abs(pos_value - old_pos_value) > 0) || (Math.abs(neu_value - old_neu_value) > 0) || (Math.abs(neg_value - old_neg_value) > 0)){
            // Update until positive height is reached
            if(pos_bool && (Math.abs(pos_value - old_pos_value) > 0))
                old_pos_value++;
            else if(!pos_bool && (Math.abs(pos_value - old_pos_value) > 0))
                old_pos_value--;

            // Update until neutral height is reached
            if(neu_bool && (Math.abs(neu_value - old_neu_value) > 0))
                old_neu_value++;
            else if(!neu_bool && (Math.abs(neu_value - old_neu_value) > 0))
                old_neu_value--;

            // Update until negative height is reached
            if(neg_bool && (Math.abs(neg_value - old_neg_value) > 0))
                old_neg_value++;
            else if(!neg_bool && (Math.abs(neg_value - old_neg_value) > 0))
                old_neg_value--;

            // Clear the Two type objects
            two.clear();

            // Update the rectangles
            let new_rect1 = two.makeRectangle(0, 0 - (100-old_pos_value)*2, 150, old_pos_value*4);
            let new_rect2 = two.makeRectangle(-200, 0 - (100-old_neu_value)*2, 150, old_neu_value*4);
            let new_rect3 = two.makeRectangle(-400, 0 - (100-old_neg_value)*2, 150, old_neg_value*4);

            // Create the new rectangles
            createRectangles(new_rect1, new_rect2, new_rect3,false);

            // Stop the event in the last iteration
            if((Math.abs(pos_value - old_pos_value) < 1) && (Math.abs(neu_value - old_neu_value) < 1) && (Math.abs(neg_value - old_neg_value) < 1))
                two.pause();
        }
    }).play();
}