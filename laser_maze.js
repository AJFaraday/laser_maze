LazerMaze = {
  rows: [],
  drawing: false,

  init: function(width, height) {
    this.height = height;
    this.width = width;

    this.holder = $('#maze');
    this.populate(height, width);
    this.draw_frame();
    this.set_size(height, width);
    this.bind_events();
  },

  populate: function(height, width) {
    for(i = 0; i < height; i++) {
      var row = new Row(width, i);
      this.rows.push(row);
      if(i == 0) {
        $.each(row.cells, function(idx, cell) {cell.edge = true})
      }
      if(i == (height - 1)) {
        $.each(row.cells, function(idx, cell) {cell.edge = true})
      }
    }
  },

  draw_frame: function() {
    $.each(
      this.rows,
      function(idx, row) {
        $.each(
          row.cells,
          function(idx, cell) {
            if(cell.edge) {
              cell.toggle();
            }
          }
        )
      }
    )
  },

  set_size: function(height, width) {
    this.beams = [];
    this.holder.css('height', 20 * height);
    this.holder.css('width', ((12 * width) + 2));
  },

  bind_events: function() {
    this.holder.on('mousedown', this.start_draw);
    this.holder.on('mouseup', this.end_draw);
    this.holder.on('mouseleave', this.end_draw);
  },

  //////////////
  // API
  //////////////

  cell: function(x, y) {
    var row = this.rows[y];
    if(row === undefined) {return null}
    return row.cells[x];
  },

  random_cell: function() {
    return this.cell(
      Math.floor(Math.random() * (this.width - 2)) + 1,
      Math.floor(Math.random() * (this.height - 2)) + 1
    )
  },

  add_laser: function(x, y) {
    this.cell(x, y).become_laser();
  },

  add_random_laser: function() {
    this.random_cell().become_laser();
  },
  //////////////
  // input control
  //////////////

  start_draw: function() {
    if(LazerMaze.current_cell.edge) {
    } else if(LazerMaze.current_cell.laser) {
      LazerMaze.moving_laser = true;
    } else {
      LazerMaze.drawing = true;
      LazerMaze.current_cell.toggle();
    }
  },

  end_draw: function() {
    LazerMaze.drawing = false;
    LazerMaze.moving_laser = false;
  },

  //////////////
  // wide changes
  //////////////

  clear: function() {
    $.each(
      this.rows,
      function(idx, row) {
        $.each(
          row.cells,
          function(idx, cell) {
            if(!cell.edge && !cell.laser) {
              cell.empty();
            }
          }
        )
      }
    );
  },

  randomise: function(chance) {
    $.each(
      this.rows,
      function(idx, row) {
        $.each(
          row.cells,
          function(idx, cell) {
            if(!cell.edge && LazerMaze.one_in(chance)) {
              cell.toggle();
            }
          }
        )
      }
    )
  },

  one_in: function(n) {
    return Math.floor(Math.random() * n) == 0
  },

  //////////////
  // lasers
  //////////////

  lasers: [],
  get_lasers: function() {
    this.lasers = [];
    $.each(
      this.rows,
      function(idx, row) {
        $.each(
          row.cells,
          function(idx, cell) {
            if(cell.laser) {
              LazerMaze.lasers.push(cell);
            }
          }
        )
      }
    )
  },

  place_laser: function(x, y) {
    var cell = this.cell(x, y);
    if(cell === null || cell.edge) { return true }
    cell.become_laser();
  },

  beams: [],
  beam_directions: ['ne', 'se', 'sw', 'nw'],
  fire_lasers: function() {
    var new_beams = [];
    $.each(
      this.lasers,
      function(idx, laser) {
        new_beams.push(
          new Beam(
            laser.x,
            laser.y,
            LazerMaze.beam_directions[Math.floor(Math.random() * 4)]
          )
        );
      }
    );
    $.each(new_beams, function(idx, beam) {beam.start()});
    this.beams = this.beams.concat(new_beams)
  },

  clear_beams: function() {
    $.each(this.beams, function(idx, beam) {beam.stop()});
    this.beams = [];
    $('.beam').html('&nbsp;').css({color: '#000000'}).removeClass('beam');
    $('.cell').not('.laser').css({color: '#000000'});
  },

  clear_lasers: function() {
    $.each(this.lasers, function(idx,cell){cell.remove_laser()});
  }

};

