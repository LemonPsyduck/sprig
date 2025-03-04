/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Mission: Get Sprig
@author: 
@tags: []
@addedOn: 2024-00-00
*/

/* map tiles */
const water = "w";
const door = "d";
const lily = "l";
const portal1 ="q";
const portal2 = "r";
const block = "b";

const player = "p";

setLegend(
  [ player, bitmap`
................
................
.....CC..CC.....
....C33CC33C....
....C203302C....
...C88333388C...
....C33CC33C....
.....C3333C.....
....C333333C....
....C332233C....
....C322223C....
....C32CC23C....
....C3C..C3C....
....C3C..C3C....
...C333CC333C...
....CCC..CCC....` ],
  [ lily, bitmap`
5555555555555555
5527557725727555
557777DDDD777755
55575D4444D75555
5555D444444D5555
552D48844884D555
52D4488888855555
57D4448668577775
55D4448668444D75
55D4488888844D55
552D48844884D525
5575D444444D5775
55777D4444D77775
555777DDDD777755
5555755555555555
5555555555555555` ],
  [ water, bitmap`
5555555555555555
5577775555775575
5555555555555555
5757755577557555
5555555555555555
5555555555555555
5555555575577755
5775755555555555
5555555555555555
5557775557577555
5555555555555555
5555555555777755
5557775755555555
5555555555555555
7755555555757775
5557557755555555` ],
  [ door, bitmap`
LLLLLL00000LLLLL
LL111L0L111LL1LL
L12110CC00CL121L
L11210CC0CCL112L
LL11C00C0CCC11LL
LL0LCC0C00CCLLLL
L112C00CC0CC0L1L
LL11C0CCC0CCL21L
LL11C0CCC0CCL120
L0LC626CC0CCC110
LL0C266CC00CCL00
LL1C66CCC00CC10L
L12C0CCCC00C011L
L1C00CCCC0CC0C1L
LLC0CCCC00CC0CLL
LLC0CCCC0CCC0CLL` ],
  [ portal1, bitmap`
5555555555555555
5555777777725555
5557755555572555
5575555555555755
5775577777755775
5255775555775575
5255755555575575
5755755755575575
5755755775575575
5755755555575575
5755775555775525
5775577777755275
5575555555555755
5557755555577555
5555777777775555
5555555555555555`],
  [ portal2, bitmap`
DDDDDDDDDDDDDDDD
DDDD44444442DDDD
DDD44DDDDDD42DDD
DD4DDDDDDDDDD4DD
D44DD444444DD44D
D2DD44DDDD44DD4D
D2DD2DDDDDD4DD4D
D4DD4DD4DDD4DD4D
D4DD4DD42DD4DD4D
D4DD4DDDDDD4DD4D
D4DD42DDDD44DD2D
D44DD424444DD24D
DD4DDDDDDDDDD4DD
DDD44DDDDDD44DDD
DDDD44444444DDDD
DDDDDDDDDDDDDDDD`],
  [ block, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setSolids([player, lily])

let level = 0
const levels = [
  map`
..wlp
dl...
..l..
w..w.`,
  map`
d.llw
p....
lllww
w.lw.`,
  map`
p....b.
..ll.b.
...l.b.
.......
w..lqbb
ww.wbdr`
]

setMap(levels[level])

setPushables({
  [ player ]: [ lily ],
  [ lily ] : [ lily ]
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  setMap(levels[level]);
})
afterInput(() => {
  if(tilesWith(water, lily).length == tilesWith(water).length && tilesWith(player, door).length == 1) {
    setMap(levels[level]);
    if(level == 2 && tilesWith(water, lily).length == tilesWith(water).length && tilesWith(player, door).length == 1) {
    addText("Finished!", 1, 4);
  }else{level = level + 1;} 
  } 

  if(tilesWith(player, portal1).length == 1) {
    getFirst(player).x = getFirst(portal2).x;
    getFirst(player).y = getFirst(portal2).y;
  }
})