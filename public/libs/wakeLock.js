var noSleep = new NoSleep();

document.addEventListener('dblclick', function enableNoSleep() {
  alert("Stays awake.\nClose Tab to re-enable the energy saver.");
  noSleep.enable();
}, false);