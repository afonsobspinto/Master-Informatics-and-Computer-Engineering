function select(){

    // Get the topics div
    let selected = document.getElementById("topics");

    // The previous selected percentage
    let old_p = selected_percentage;

    // Change the percentage to the selected one
    selected_percentage = selected.options[selected.selectedIndex].value;

    // Clears all Two type objects
    two.clear();

    // Change the rectangles every time a new topic is selected
    changeRectangles(rect1, rect2, old_p);
}

function createRectangles(rect1, rect2, first) {

    // Color the rectangles
    rect1.fill = '#60c403';
    rect1.stroke = '#067c50';
    rect2.fill = '#ff0000';
    rect2.stroke = '#a50000';

    // Groups can take an array of shapes and/or groups.
    let group = two.makeGroup(rect1, rect2);
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

function changeRectangles(rect1, rect2, old_p) {
    // Change the percentage text
    inverse = 100 - selected_percentage;
    percentage1.innerText = selected_percentage + "%";
    percentage2.innerText = (100 - selected_percentage)  + "%";

    // The previous selected percentage
    let old_p1 = old_p;

    // If the difference between the new percentage and the previous one is positive
    let positive = false;
    if(selected_percentage - old_p1 > 0)
        positive = true;

    // Create an event to update the rectangles
    two.bind('update', function(frameCount) {

        // Only update until the correct height is reached
        if(Math.abs(selected_percentage - old_p1) > 0){
            if(positive)
                old_p1++;
            else
                old_p1--;

            // Clear the Two type objects
            two.clear();

            // Update the rectangles
            let new_rect1 = two.makeRectangle(-100, 0 - (100-old_p1)*2, 150, old_p1*4);
            let new_rect2 = two.makeRectangle(-300, 0 - old_p1*2, 150, (100-old_p1)*4);

            // Create the new rectangles
            createRectangles(new_rect1, new_rect2, false);

            // Stop the event in the last iteration
            if(Math.abs(selected_percentage - old_p1) < 1)
                two.pause();
        }
    }).play();
}