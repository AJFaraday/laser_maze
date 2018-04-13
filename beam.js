function Beam(x, y, dir) {
  this.x = x;
  this.y = y;
  this.dir = dir;
  this.active = true;

  /*
   directions
   1: ne
   2: se
   3: sw
   4: nw
   */

  this.move = function() {
    if(!this.active) {return true}
    this.get_targets();
    switch(this.dir) {
      case 1:
        this.move_ne();
    }
  };

  this.move_ne = function() {
    if(this.targets.ne.filled) {
      this.active = false;
    } else {
      this.go_to(this.targets.ne);
    }
  };

  this.go_to = function(cell) {
    this.x = cell.x;
    this.y = cell.y;
    switch(this.dir) {
      case 1:
        cell.change_to('/');
        cell.html_cell.addClass('beam');
        cell.flash();
    }
  };

  ///////////////////////
  // Targets
  ///////////////////////

  this.get_targets = function() {
    this.targets = {
      nw: LazerMaze.cell((this.x - 1), (this.y - 1)),
      n: LazerMaze.cell(this.x, (this.y - 1)),
      ne: LazerMaze.cell((this.x + 1), (this.y - 1)),
      e: LazerMaze.cell((this.x + 1), this.y),
      se: LazerMaze.cell((this.x + 1), (this.y + 1)),
      s: LazerMaze.cell(this.x, (this.y + 1)),
      sw: LazerMaze.cell((this.x - 1), (this.y + 1)),
      w: LazerMaze.cell((this.x - 1), this.y)
    }
  }

}