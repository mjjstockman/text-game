let inventory = [];
let maxInventory = 3;
let eatenByDog;

const inventoryList = document.getElementById("inventoryList");

class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._linkedItems = {};
  }

  linkRoom(direction, room) {
    this._linkedRooms[direction] = room;
  }

  linkItem(item) {
    this._linkedItems[item.name] = item;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    const itemNames = Object.values(this._linkedItems).map(
      (item) => item.name
    );
    let description = `Looking around the ${this._name} you can see ${this._description}`
    if (Object.keys(this._linkedItems).length !== 0) {
      description += ` There is also <strong>${itemNames.join(', ')}</strong> in the room.`;
    }
    return description;
  }

  move(direction) {
    if (currentRoom._name === "Kitchen" && direction === "north") {
      if (!inventory.some((item) => item.name === "lockpick")) {
        alert("The door is locked");
        return this;
      } else if (!inventory.some((item) => item.name === "book")) {
        alert(
          "You don't know how to use the lockpick. You have no phone reception...how did \
          people learn things before the internet!?"
        );
        return this;
      }
    }
    if (currentRoom._name === "Kitchen" && direction === "north") {
      dogDeath();
    }
    if (direction in this._linkedRooms) {
      // Change highlight on map to match current room
      const newRoomId = this._linkedRooms[direction]._name.toLowerCase();
      const element = document.getElementById(newRoomId);
      const oldRoom = currentRoom._name.toLowerCase();
      const oldRoomId = document.getElementById(oldRoom);
      oldRoomId.style.backgroundColor = "";
      element.style.backgroundColor = "blue";

      return this._linkedRooms[direction];
    } else {
      alert("That way is blocked.");
      return this;
    }
  }

  pickUp(itemName) {
    if (inventory.length === maxInventory) {
      alert("You can't carry any more items.");
      return;
    }

    if (this._linkedItems[itemName]) {
      const item = this._linkedItems[itemName];
      const itemDescriptions = Object.values(this._linkedItems).map(
        (item) => item.description
      );

      if (
        currentRoom.name === "Pool" &&
        item.name === "lockpick" &&
        !inventory.some((i) => i.name === "armbands")
      ) {
        alert("You can't swim and drowned.");
        gameOver();
        return;
      }

      inventory.push(item);
      delete this._linkedItems[itemName];
      alert(`You have picked up ${item.description}`);

      // add item to inventory list
      const listItem = document.createElement("li");
      listItem.textContent = item.name;
      listItem.id = item.name;
      inventoryList.appendChild(listItem);
    } else {
      alert("Item not in room");
      return;
    }
  }

  drop(itemName) {
    const itemIndex = inventory.findIndex((item) => item.name === itemName);

    // remove dropped item from inventory
    if (itemIndex !== -1) {
      const droppedItem = inventory.splice(itemIndex, 1)[0];
      currentRoom.linkItem(droppedItem);
      alert(`You dropped the ${droppedItem.name} in the ${currentRoom.name}`);
      inventoryList.removeChild(document.getElementById(droppedItem.name));
    } else {
      alert("You don't have that item.");
    }
  }
}

function dogDeath() {
  eatenByDog = setTimeout(function () {
    alert("You were eaten by very hungry zombie dogs.");
    gameOver();
  }, 7000);
}

class Item {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }
}

const Armbands = new Item("armbands", "a pair of inflatable armbands");
const LockPick = new Item("lockpick", "a lock pick");
const Book = new Item("book", 'a book titled "How To Pick Locks"');
const Meat = new Item(
  "meat",
  "a stinking, rotten piece of meat. No human should eat this. However...I bet an animal would love it."
);

const Pool = new Room("Pool", "a large swimming pool that's very deep.");
const Library = new Room(
  "Library",
  "a large room with bookshelves covering all the walls."
);
const Kitchen = new Room(
  "Kitchen",
  "a basic kitchen with a fridge, cooker and sink. There is a door to the north leading to the Garden. You could escape from the Garden, but the door is locked."
);
const DiningRoom = new Room(
  "Dining Room",
  "a large room with a long table and chairs."
);
const Garden = new Room(
  "Garden",
  "the way to escape! A large garden with a lawn and flower beds......and some zombie dogs."
);

Pool.linkRoom("north", Library);
Pool.linkRoom("east", DiningRoom);
Library.linkRoom("east", Kitchen);
Library.linkRoom("south", Pool);
Kitchen.linkRoom("north", Garden);
Kitchen.linkRoom("south", DiningRoom);
Kitchen.linkRoom("west", Library);
DiningRoom.linkRoom("north", Kitchen);
DiningRoom.linkRoom("west", Pool);
Garden.linkRoom("south", Kitchen);

Kitchen.linkItem(Armbands);
Pool.linkItem(LockPick);
Library.linkItem(Book);
DiningRoom.linkItem(Meat);

let currentRoom;

const displayRoomInfo = (room) => {
  let textContent = "<p>" + room.describe() + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
};

const startGame = () => {
  currentRoom = Pool;
  const startRoomId = document.getElementById(currentRoom._name.toLowerCase());
  startRoomId.style.backgroundColor = "blue";
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value.toLowerCase();
      const commandSplit = command.split(" ");
      if (commandSplit[0] === "move") {
        const directions = ["north", "south", "east", "west"];
        if (directions.includes(commandSplit[1])) {
          currentRoom = currentRoom.move(commandSplit[1]);
          displayRoomInfo(currentRoom);
          clearTextArea();
        }
      } else if (commandSplit[0] === "pick" && commandSplit[1] === "up") {
        const itemToCollect = commandSplit[2];
        currentRoom.pickUp(itemToCollect);
        clearTextArea();
      } else if (commandSplit[0] === "drop") {
        const itemToDrop = commandSplit[1];
        currentRoom.drop(itemToDrop);
        clearTextArea();
        if (
          !inventory.some((i) => i.name === "meat") &&
          itemToDrop === "meat" &&
          currentRoom.name === "Garden"
        ) {
          clearTimeout(eatenByDog);
          alert("The dogs are distracted by the meat and YOUN ESCAPE THE HOUSE!!");
        }
      } else {
        alert("Invalid command");
        clearTextArea();
      }
    }
  });
};

function clearTextArea() {
  document.getElementById("usertext").value = "";
}

function gameOver() {
  alert("Game Over");
  startGame();
}

startGame();
