LazerMaze = {
  rows: [],
  drawing: false,

  init: function(height, width) {
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

  //////////////
  // input control
  //////////////

  start_draw: function() {
    LazerMaze.drawing = true;
    if(!LazerMaze.current_cell.edge) {
      LazerMaze.current_cell.toggle();
    }
  },

  end_draw: function() {
    if(LazerMaze.drawing) {
      LazerMaze.drawing = false;
    }
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
            if(!cell.edge) {
              cell.empty();
            }
          }
        )
      }
    );
    $.each(this.lasers, function(idx, cell) {cell.remove_laser()});
    this.lasers = [];
    $('spam.beam').removeClass('beam');
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
  fire_lasers: function() {
    this.beams = [];
    $.each(
      this.lasers,
      function(idx, laser) {
        LazerMaze.beams.push(new Beam(laser.x, laser.y, 1));
      }
    );
    setInterval(LazerMaze.move_beams, 200)
  },

  move_beams: function() {
    $.each(
      LazerMaze.beams,
      function(idx, beam) {
        beam.move();
      }
    )
  }

};

