Sound = {
  init: function() {
    this.synths = [];
    for(var i = 0; i < 20; i++) {
      this.synths.push(
        new Tone.Synth({
          envelope: {
            attack: 0.02,
            decay: 0.1,
            release: 0.1
          },
          oscillator: {
            type : 'triangle'
          }
        }).toMaster()
      );
    }
  },
  synth_cursor: 0,

  play: function(x, y) {
    var note = this.get_note(x + 40);
    var synth = this.next_synth();
    synth.triggerAttackRelease(note, '16n');
  },

  get_note: function(midi) {
    return Math.pow(2, (midi - 69) / 12) * 440
  },

  next_synth: function(){
    this.synth_cursor += 1;
    this.synth_cursor %= this.synths.length;
    return this.synths[this.synth_cursor];
  }
};
