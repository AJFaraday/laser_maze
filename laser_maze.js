LazerMaze = {
  rows: [],
  drawing: false,

  init: function(height, width) {
    this.holder = $('#maze');
    for(i = 0; i < height; i++) {
      this.rows.push(new Row(width));
    }
    this.set_size(height, width);

    this.bind_events();
  },

  set_size: function(height, width) {
    this.holder.css('height', 20 * height);
    this.holder.css('width', 12 * width);
  },

  bind_events: function() {
    this.holder.on('mousedown', this.start_draw);
    this.holder.on('mouseup', this.end_draw);
    this.holder.on('mouseleave', this.end_draw);
  },

  start_draw: function() {
    LazerMaze.drawing = true;
    LazerMaze.current_cell.flash();
  },

  end_draw: function() {
    if(LazerMaze.drawing) {
      LazerMaze.drawing = false;
    }
  }
};

