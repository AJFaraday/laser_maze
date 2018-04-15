function Beam(x, y, dir) {
  this.x = x;
  this.y = y;
  this.dir = dir;

  this.start = function() {
    var beam = this;
    beam.process = setInterval(function() {beam.move()}, 200);
  };

  this.stop = function() {
    console.log('stopping beam at '+this.x+':'+this.y);
    clearInterval(this.process);
    LazerMaze.beams.splice(LazerMaze.beams.indexOf(this),1);
  };

  this.bonk = function() {
    console.log('bonk')
    Sound.play(this.x, ((this.y * -1) + LazerMaze.height))
  };

  this.move = function() {
    if (this.deleted) {return}
    this.get_targets();
    if(this.targets[this.dir].laser) {
      this.stop();
      return false;
    }
    switch(this.dir) {
      case 'ne':
        this.move_ne();
        break;
      case 'se':
        this.move_se();
        break;
      case 'sw':
        this.move_sw();
        break;
      case 'nw':
        this.move_nw();
        break;
    }
  };

  this.move_ne = function() {
    if(!this.targets.ne.filled) {
      this.go_to(this.targets.ne)
    } else if(!this.targets.n.filled) {
      this.dir = 'nw';
      this.go_to(this.targets.n);
      this.bonk();
    } else if(!this.targets.e.filled) {
      this.dir = 'se';
      this.go_to(this.targets.e);
      this.bonk();
    } else {
      this.dir = 'sw';
      this.bonk();
    }
  };

  this.move_nw = function() {
    if(!this.targets.nw.filled) {
      this.go_to(this.targets.nw)
    } else if(!this.targets.n.filled) {
      this.dir = 'ne';
      this.go_to(this.targets.n);
      this.bonk();
    } else if(!this.targets.w.filled) {
      this.dir = 'sw';
      this.go_to(this.targets.w) ;
      this.bonk();
    } else {
      this.dir = 'se';
      this.bonk();
    }
  };

  this.move_se = function() {
    if(!this.targets.se.filled) {
      this.go_to(this.targets.se)
    } else if(!this.targets.s.filled) {
      this.dir = 'sw';
      this.go_to(this.targets.s);
      this.bonk();
    } else if(!this.targets.e.filled) {
      this.dir = 'ne';
      this.go_to(this.targets.e) ;
      this.bonk();
    } else {
      this.dir = 'nw';
      this.bonk();
    }
  };

  this.move_sw = function() {
    if(!this.targets.sw.filled) {
      this.go_to(this.targets.sw)
    } else if(!this.targets.s.filled) {
      this.dir = 'se';
      this.go_to(this.targets.s);
      this.bonk();
    } else if(!this.targets.w.filled) {
      this.dir = 'nw';
      this.go_to(this.targets.w) ;
      this.bonk();
    } else {
      this.dir = 'ne';
      this.bonk();
    }

  };

  this.go_to = function(cell) {
    if (cell.laser) {
      this.stop();
      return false;
    }
    switch(this.dir) {
      case 'ne':
        cell.change_to('/');
        break;
      case 'se':
        cell.change_to('\\');
        break;
      case 'sw':
        cell.change_to('/');
        break;
      case 'nw':
        cell.change_to('\\');
        break;
    }
    this.x = cell.x;
    this.y = cell.y;
    cell.html_cell.addClass('beam');
    cell.flash();
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
  };

}