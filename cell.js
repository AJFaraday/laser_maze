function Cell(html_row) {
  //setup html
  this.html_cell = $('<span>').addClass('cell');
  this.html_cell.html('#');
  html_row.append(this.html_cell);

  //bind events
  var cell = this;
  this.html_cell.on(
    'mouseover',
    function() {
      LazerMaze.current_cell = cell;
      if(LazerMaze.drawing) {
        cell.flash();
      }
    }
  );

  this.change_to = function(char) {
    this.html_cell.html(char);
    this.flash();
  };

  this.flash = function() {
    var me = this;
    this.html_cell.addClass('flash');
    setInterval(
      function() {
        me.html_cell.removeClass('flash');
      },
      2000
    )
  };
}

