function select(){
    let selected = document.getElementById("topics");
    selected_percentage = selected.options[selected.selectedIndex].value;
    two.clear();
    changeRectangles();
}

function changeRectangles() {

    // Create the percentage rectangles
    let percentage = selected_percentage;
    let inverse = 100 - percentage;
    let rect1 = two.makeRectangle(100, 0 - inverse*2, 150, percentage*4);
    let rect2 = two.makeRectangle(-100, 0 - percentage*2, 150, inverse*4);

    percentage1.innerText = selected_percentage + "%";
    percentage2.innerText = (100 - selected_percentage)  + "%";

    // Color the rectangles
    rect1.fill = 'rgba(126, 251, 9, 1)';
    rect1.stroke = '#60c403';
    rect2.fill = '#FF8000';
    rect2.stroke = 'orangered';

    // Groups can take an array of shapes and/or groups.
    let group = two.makeGroup(rect1, rect2);

    // And have translation, rotation, scale like all shapes.
    group.translation.set(two.width / 4, two.height / 2);
    group.rotation = Math.PI;
    group.scale = 0.75;

    // You can also set the same properties a shape have.
    group.linewidth = 7;

    two.update();
}