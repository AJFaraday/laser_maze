function Row(width, index) {
  this.cells = [];
  this.html_row = $('<div>').addClass('row');
  LazerMaze.holder.append(this.html_row);
  for(n = 0; n < width; n++) {
    var cell = new Cell(this.html_row, index, n);
    if(n == 0) {cell.edge = true}
    if(n == (width - 1)) {cell.edge = true}
    this.cells.push(cell);
  }
}
