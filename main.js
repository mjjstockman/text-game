let inventory = [];
// let inventory = ["book", "lock pick"];

class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = "";
    this._linkedItems = {};
  }

  linkRoom(direction, room) {
    this._linkedRooms[direction] = room;
  }

  linkItem(item) {
    this._linkedItems[item.name] = item;
  }

  set character(value) {
    this._character = value;
  }

  get character() {
    return this._character;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  describe() {
    return (
      "Looking around the " + this._name + " you can see " + this._description
    );
  }

  move(direction) {
    if (currentRoom._name === 'Kitchen' && direction === 'north' && (!inventory.includes('lock pick') || !inventory.includes('book'))) {
      // console.log(direction)
      alert('You need a lock pick and some knowledge to open the door.')
      return this
    }
    // console.log(currentRoom._name)
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("That way is blocked.");
      return this;
    }
  }

  pickUp(item) {
    if (item in this._linkedItems) {
      if (item === "key" && !inventory.includes("armbands")) {
        alert("You can't swim and drowned.");
        return;
      }
      inventory.push(item);
      console.log(inventory);
      delete this._linkedItems[item];
      alert(`You have picked up ${item}.`);
    } else {
      console.log("item not in room");
      return;
    }
  }
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
    return this.description;
  }

  set name(value) {
    this._name = value;
  }

  set description(value) {
    this._description = value;
  }
}

const Armbands = new Item("armbands", "a pair of inflatable armbands");
const LockPick = new Item("lock pick", "a lock pick");
const Book = new Item("book", 'a book titled "How To Pick Locks"');

class Character {
  constructor(name, description, conversation) {
    (this._name = name), (this._description = description);
    this._conversation = conversation;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return (
      "You have met " +
      this._name +
      ", " +
      this._name +
      " is " +
      this._description
    );
  }

  talk() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}

const Pool = new Room(
  "Pool",
  "a large swimming pool with some kind of floating device in the deep end."
);
const Library = new Room(
  "Library",
  "a large room with bookshelves covering all the walls."
);
const Kitchen = new Room(
  "Kitchen",
  "a basic kitchen with a fridge, cooker and sink. There are some armbands in the sink."
);
const DiningRoom = new Room(
  "Dining Room",
  "a large room with a long table and chairs. The table is set for a meal."
);
const Garden = new Room(
  "Garden",
  "a large garden with a lawn and flower beds."
);

Pool.linkRoom("north", Library);
Pool.linkRoom("east", DiningRoom);
// Library.linkRoom("north", Garden);
Library.linkRoom("east", Kitchen);
Library.linkRoom("south", Pool);
Kitchen.linkRoom("north", Garden);
Kitchen.linkRoom("south", DiningRoom);
Kitchen.linkRoom("west", Library);
DiningRoom.linkRoom("north", Kitchen);
DiningRoom.linkRoom("west", Pool);
Garden.linkRoom("south", Library);

const Dave = new Character("Dave", "a zombie", "Brrlgrh... rgrhl... brains...");
Kitchen.character = Dave;

Kitchen.linkItem(Armbands);
Pool.linkItem(LockPick);
Library.linkItem(Book);

let currentRoom;

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  if (room.character === "") {
    occupantMsg = "There is no one in this area.";
  } else {
    occupantMsg = `${room.character.talk()}`;
  }

  let textContent =
    "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
};

const displayUpdates = () => {
  let updateContent =
    "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>";
  document.getElementById("updateArea").innerHTML = updateContent;
  let occupantMsg = "";

  if (room.character === "") {
    occupantMsg = "There is no one in this area.";
  } else {
    occupantMsg = `${room.character.talk()}`;
  }

  let textContent =
    "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
};

const startGame = () => {
  // this is the starting room.
  currentRoom = Library;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value.toLowerCase();
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else {
        const commandSplit = command.split("pick up ");
        const itemToCollect = commandSplit[1];
        currentRoom.pickUp(itemToCollect);
      }
    }
  });
};

startGame();
