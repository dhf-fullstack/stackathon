/* eslint-disable camelcase */
/*
try {
*/
  const width = 700

  // boilerplate
  const VF = Vex.Flow
  // eslint-disable-next-line no-unused-vars
  var [context, group, notes] = foo()

	var latchElem = document.getElementById( "latch" );
	var latchedPitchElem = document.getElementById( "latchedPitch" );
	var latchedNoteElem = document.getElementById( "latchedNote" );
	var latchedDetuneElem = document.getElementById( "latchedDetune" );
  var latchedDetuneAmount = document.getElementById( "latched_detune_amt" );

	var targetElem = document.getElementById( "target" );
	var targetPitchElem = document.getElementById( "targetPitch" );
	var targetNoteElem = document.getElementById( "targetNote" );
	var targetDetuneElem = document.getElementById( "targetDetune" );
  var targetDetuneAmount = document.getElementById( "target_detune_amt" );

  const xmlns = "http://www.w3.org/2000/svg"
  const rect = document.createElementNS(xmlns, "rect")
  rect.style.stroke = "blue"
  //rect.style['stroke-dasharray'] = "3,2,3"
  rect.style['stroke-width'] = 1
  rect.style['fill-opacity'] = 0

  let cur_note = 0
  highlightNote(notes[cur_note],rect)

  function advance_note_cursor(dir = 1) {
    colorNote(notes[cur_note])
    console.log(`LATCHED ${latchedNoteName} ${latchedOctave}`);
    console.log(`CURRENT ${currentNoteName} ${currentOctave}`);
    cur_note += dir
    if (cur_note === notes.length) {
      //cur_note = 0
      cur_note--
    } else if (cur_note < 0) {
      //cur_note = notes.length - 1
      cur_note = 0
    }
    highlightNote(notes[cur_note], rect)
  }

  document.getElementById("next_btn").addEventListener("click", function() {
    [context, group, notes] = foo2(context, group)
    cur_note = 0
    highlightNote(notes[cur_note], rect)
  });

  /*document.getElementById("prev_btn").addEventListener("click", function() {
    advance_note_cursor(-1);
  });*/

  document.getElementById("start_btn").addEventListener("click",
  () => { console.log('START');
          onload(); })

  /*document.getElementById("stop_btn").addEventListener("click",
  () => { console.log('STOP');
          toggleLiveInput(); })*/

  function highlightNote(note, rect) {
    rect.remove()
    let element = note.attrs.el
    //console.log('note element', element)
    let bbox = element.getBBox()
    rect.setAttributeNS(null,"x",bbox.x-5)
    rect.setAttributeNS(null,"y",bbox.y-20)
    rect.setAttributeNS(null,"height",bbox.height+30)
    rect.setAttributeNS(null,"width",bbox.width+10)
    element.parentNode.insertBefore(rect, element.nextSibling)
    currentNoteName = note.keyProps[0].key
    currentNoteOctave = note.keyProps[0].octave
    targetNoteElem.innerHTML = `${note.keyProps[0].key} ${note.keyProps[0].octave}`
  }

  function colorNote(note) {
    const rect = document.createElementNS(xmlns, "rect")
    rect.style.fill = "green"
    //rect.style['stroke-dasharray'] = "3,2,3"
    rect.style['stroke-width'] = 1
    rect.style['fill-opacity'] = .25
    let element = note.attrs.el
    //console.log('note element', element)
    let bbox = element.getBBox()
    rect.setAttributeNS(null,"x",bbox.x-5)
    rect.setAttributeNS(null,"y",bbox.y-20)
    rect.setAttributeNS(null,"height",bbox.height+30)
    rect.setAttributeNS(null,"width",bbox.width+10)
    element.parentNode.insertBefore(rect, element.nextSibling)
  }

/*
} catch (err) {
  errors.innerText = err
}
*/

function foo() {
  const div = document.getElementById('score1')
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
  renderer.resize(2*width, 200)
  const context = renderer.getContext()

  // customize
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

  // Staff
  const stave = new VF.Stave(10, 40, width)
  stave.addClef('treble').addTimeSignature('4/4')

  // render
  stave.setContext(context).draw()

  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }),
  ];

  var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["c#/5"], duration: "h" }).addAccidental(0, new VF.Accidental("#")),
    new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: "w" }),
  ];

  var voices = [
    new VF.Voice({num_beats: 12, beat_value: 2}).addTickables(notes),
    //new VF.Voice({num_beats: 12, beat_value: 2}).addTickables(notes2)
  ];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  const group = context.openGroup()
  voices.forEach(function(v) { v.draw(context, stave) });
  context.closeGroup()

  return [context, group, notes]
}

function foo2(context, prevGroup) {

  context.svg.removeChild(prevGroup);
/*
  const div = document.getElementById('score1')
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
  renderer.resize(2*width, 200)
  const context = renderer.getContext()
*/
  // customize
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

  // Staff
  const stave = new VF.Stave(10, 40, width)
  stave.addClef('treble').addTimeSignature('4/4')

  // render
  stave.setContext(context).draw()

  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "w" }),
  ];


  var voices = [
    new VF.Voice({num_beats: 12, beat_value: 2}).addTickables(notes),
  ];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });

  return [context, group, notes]
}