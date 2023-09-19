class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = "";
    // this._objects = {};
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

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("That way is blocked.");
      return this;
    }
  }
}

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
  "a basic kitchen with a fridge, cooker and sink."
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
Library.linkRoom("north", Garden);
Library.linkRoom("east", Kitchen);
Library.linkRoom("south", Pool);
Kitchen.linkRoom("south", DiningRoom);
Kitchen.linkRoom("west", Library);
DiningRoom.linkRoom("north", Kitchen);
DiningRoom.linkRoom("west", Pool);
Garden.linkRoom("south", Library);



const Dave = new Character("Dave", "a zombie", "Brrlgrh... rgrhl... brains...");
Kitchen.character = Dave;

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

const startGame = () => {
  // this is the starting room.
  currentRoom = DiningRoom;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value.toLowerCase();
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else {
        document.getElementById("usertext").value = "";
        alert("That is not a valid command.");
        return;
      }
    }
  });
};

startGame();
