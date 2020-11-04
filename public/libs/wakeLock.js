var noSleep = new NoSleep();

function enableNoSleep() {
  alert("Stays awake.\nClose Tab to re-enable the energy saver.");
  noSleep.enable();
}

//document.addEventListener('dblclick', enableNoSleep(), false);