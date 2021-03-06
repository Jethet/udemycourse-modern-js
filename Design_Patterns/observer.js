// Observer pattern notifies the DOM of updates that are needed

// example with prototypes:
function EventObserver() {
  this.observers = [];
}

EventObserver.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
    console.log(`You are now subscribed to ${fn.name}`);
  },
  unsubscribe: function (fn) {
    // Filter out from the list of observers whatever matches the callback
    // function. If there is no match, the callback stays on the list. The
    // filter returns a new list and reassigns the list of observers.
    this.observers = this.observers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
    console.log(`You are now unsubscribed from ${fn.name}`);
  },
  fire: function () {
    this.observers.forEach(function (item) {
      item.call();
    });
  },
};

const click = new EventObserver()

// Event listeners
document.querySelector('.sub-ms').addEventListener('click', function() {
  click.subscribe(getCurMilliseconds)
})

document.querySelector('.unsub-ms').addEventListener('click', function() {
  click.unsubscribe(getCurMilliseconds)
})

document.querySelector('.fire').addEventListener('click', function() {
  click.fire()
})


// Click handler
const getCurMilliseconds = function() {
  console.log(`Current milliseconds: ${new Date().getMilliseconds()}`);
}