class Interface {
  constructor(name, methods=[], properties=[]) {
    this.name = name;
    this.methods = [];
    this.properties = [];

    for (let i=0; i < methods.length; i++) {
      if (typeof methods[i] !== 'string') {
        throw new Error('The constructor of the interface wait for method names as chain.')
      }
      this.methods.push(methods[i]);
    };

    for (let i=0; i < properties.length; i++) {
      if (typeof properties[i] !== 'string') {
      throw new Error('The constructor of the interface wait for property names as chain.')
      }
      this.properties.push(properties[i]);
    };

  }; //The end of constructor

  isIplementedBy(obj) {
    var methodsLen = this.methods.length;
    var propertiesLen = this.properties.length;
    var currentMember;

    if(obj) {
      //Methods checking
      for (let i=0; i < methodsLen; i++) {
        currentMember = this.methods[i];
        if(!obj[currentMember] || typeof obj[currentMember] !== 'function') {
          throw new Error('The object not implements interface ' + this.name + '. Cannot find required method ' + currentMember + '.');
        }
      }

      //Properties checking
      for (let i=0; i < propertiesLen; i++) {
        currentMember = this.properties[i];
        if((obj[currentMember] === undefined) || typeof obj[currentMember] === 'function') {
        throw new Error('The object not implements interface ' + this.name + '. Cannot find required property ' + currentMember + '.');
        }
      }
    }
    else throw new Error('Hasn`t any object to check!');
  };

};

export const IisStruct = new Interface('IisStruct', ['createStruct', 'changePosition'], ['A', 'B', 'C', 'D', 'id']);
export const IisChar = new Interface('IisChar', ['move', 'jump'], ['life']);
export const IisPlayer = new Interface('IisPlayer', ['crouch', 'gainPoints'], ['score', 'isCrouching', 'id']);
export const IisGainPoint = new Interface('IisGainPoint', ['create'], ['gainPoint', 'id']);
