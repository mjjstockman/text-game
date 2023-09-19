class Room {
    constructor(name, description) {
      this._name = name;
      this._description = description;
      this._linkedRooms = {};
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
  
  
    /**
     * a method to produce friendly room description
     * 
     * @returns {string} description of the room
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "Looking around the " + this._name + " you can see " + this._description;
    }
  
    /**
    * a method to add rooms to link rooms to this one
    * it does this by adding them to _linkedRooms
    * 
    * @param {string} direction the direction the other rooom is from this one
    * @param {object} roomToLink the room that is in that direction
    * @author Neil Bizzell
    * @version 1.0
    */
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  }
  
  class Character {
    constructor(name, description, conversation) {
      this._name = name,
      this._description = description
      this._conversation = conversation
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
        alert("Decription is too short.");
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
    /**
     * a method to produce friendly character description
     * 
     * @returns {string} description of the character
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    /**
     * a method to produce friendly conversation text
     * 
     * @returns {string} the conversation text
     * @author Neil Bizzell
     * @version 1.0
     */
    talk() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }
  
  class Enemy extends Character{
    constructor(name, description, conversation, weakness){
     super(name, description, conversation)
     this._weakness = weakness
    }
  
    fight(item){
      if (item = this._weakness){
        return true
      } else {
        return false
      }
    }
  } 