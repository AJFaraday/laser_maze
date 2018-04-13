function Row(width) {
  this.cells = [];
  this.html_row = $('<div>').addClass('row');
  LazerMaze.holder.append(this.html_row);
  for (n = 0; n < width; n++) {
    this.cells.push(new Cell(this.html_row));
  }
}
