function Cell(html_row, row_index, cell_index) {
  this.filled = false;
  this.edge = false;
  this.laser = false;
  this.x = cell_index;
  this.y = row_index;
  //setup html
  this.html_cell = $('<span>').addClass('cell');
  this.html_cell.html('&nbsp');
  html_row.append(this.html_cell);

  //bind events
  var cell = this;
  this.html_cell.on(
    'mouseover',
    function() {
      LazerMaze.current_cell = cell;
      if(LazerMaze.drawing && !cell.edge) {cell.toggle()}
    }
  );

  this.toggle = function() {
    if(this.filled) {
      this.empty();
    } else {
      this.fill();
    }
  };

  this.change_to = function(char) {
    this.html_cell.html(char);
  };

  this.flash = function() {
    if(this.edge) {return false}
    var me = this;
    this.html_cell.addClass('flash');
    setInterval(
      function() {me.html_cell.removeClass('flash')},
      2000
    )
  };

  this.neighbours = function() {
    if(this.neighour_hash === undefined) {
      this.neighbour_hash = {
        up: this.up(),
        down: this.down(),
        left: this.left(),
        right: this.right()
      }
    }
    return this.neighbour_hash;
  };

  this.up = function() {
    return LazerMaze.cell(this.x, (this.y - 1));
  };

  this.down = function() {
    return LazerMaze.cell(this.x, (this.y + 1));
  };

  this.left = function() {
    return LazerMaze.cell((this.x - 1), this.y);
  };

  this.right = function() {
    return LazerMaze.cell((this.x + 1), this.y);
  };

  this.has_vertical_neighbours = function() {
    return (
      (this.neighbours().up && this.neighbours().up.filled) ||
      (this.neighbours().down && this.neighbours().down.filled)
    )
  };

  this.has_horizontal_neighbours = function() {
    return (
      (this.neighbours().left && this.neighbours().left.filled) ||
      (this.neighbours().right && this.neighbours().right.filled)
    )
  };

  this.fill = function() {
    this.filled = true;
    this.draw_wall(true);
  };

  this.empty = function() {
    this.filled = false;
    this.draw_wall(true);
  };

  this.draw_wall = function(propogate) {
    if (this.laser) {return true}

    if(this.filled) {
      if(this.has_horizontal_neighbours() && this.has_vertical_neighbours()) {
        this.change_to('+')
      } else if(this.has_horizontal_neighbours()) {
        this.change_to('&minus;')
      } else if(this.has_vertical_neighbours()) {
        this.change_to('|')
      } else {
        this.change_to('+')
      }
    } else {
      this.change_to('&nbsp;')
    }
    if(propogate) {
      $.each(
        this.neighbours(),
        function(dir, cell) {
          if(cell === undefined) {return true}
          if(cell === null) {return true}
          cell.draw_wall(false);
        }
      )
    }
  }
}

