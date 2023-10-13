

let successAudio = document.createElement("audio")
successAudio.src = "success.mp3"
successAudio.id = 'success'
let failAudio = document.createElement("audio")
failAudio.src = 'fail.mp3'
failAudio.id = 'fail'


document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What Is Your Name ?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// Add Order CSS property To Game Property
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Trigger Flip Block Function
  block.addEventListener("click", function () {
    flipBlock(block);

    // Colllect All Flipped Cards
    let allFlippedBlocks = blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("is-flipped")
    );
    // Check if Two Blocks Are Selected
    if (allFlippedBlocks.length === 2) {
      // Stop Click Function
      stopClicking();
      // Trigger Check Method
      checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
}

// Stop Clicking Function
function stopClicking() {
  //  Add Class No Clicking To The Main Container
  blocksContainer.classList.add("no-clicking");
  // Enable clicking Again
  setTimeout(() => {
    //  Remove Class No Clicking To The Main Container
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology == secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    successAudio.play()
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
     

    setTimeout(()=>{
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    } , duration)
      failAudio.play()

  }
}

// Shuffle Function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);

    // Decrease Length By 1
    current--;
    // Put the index of current in stack
    temp = array[current];
    // put the random index in the current stack
    array[current] = array[random];
    // Put the temp index in random index
    array[random] = temp;
  }
  return array;
}
