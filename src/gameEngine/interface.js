class Interface {
  constructor(name, methods=[], properties=[]) {
    this.name = name;
    this.methods = [];
    this.properties = [];

    for (let method of methods) {
      if (typeof method !== 'string') {
        throw new Error('The constructor of the interface wait for method names as chain.')
      }
      this.methods.push(method);
    };

    for (let property of properties) {
      if (typeof property !== 'string') {
      throw new Error('The constructor of the interface wait for property names as chain.')
      }
      this.properties.push(property);
    };

  }; //The end of constructor

  isIplementedBy(obj) {
    const methodsLen = this.methods.length;
    const propertiesLen = this.properties.length;
    let currentMember;

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
