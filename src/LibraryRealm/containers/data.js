//Schema
/*const EmployeeSchema = {
  name: 'Employee',
  primaryKey: 'key',
  properties: {
    key: 'string', //primary key
    firstname:  'string',
    middlename: 'string',
    lastname: 'string',
    nickname: 'string',
    birthday: {type: 'date'},
    gender: 'string',
    address: 'string',
    position: 'string',
    salary: {type: 'double'},
  }
};

export default ConstructionLibrarySchema;*/

//Schema
const ConstructionLibrarySchema = {
  name: 'ConstructionLibrary',
  primaryKey: 'key',
  properties: {
    key: 'string', //primary key
    technology:  'string',
    floor: 'string',
    house: 'string',
    bedroom: 'string',
    toiletAccess: 'string',
    terraceFront: 'string',
    terraceBack: 'string',
    terraceSize: 'string',
    lotSize: 'string',
    latitude: 'string',
    longitude: 'string',
    position: 'string'
  }
};

export default ConstructionLibrarySchema;

//Enum Type options
export const GENDER_OPTIONS = {
  Male: 'Male',
  Female: 'Female'
}

//Codelisted type options
//In actual apps this will be stored to a codelist table in DB
export const POSITION_OPTIONS = {
  1: 'HR Staff',
  2: 'Accounting Staff',
  3: 'Engineer I',
  4: 'Engineer II',
  5: 'Engineer III',
  6: 'Engineer IIII',
  7: 'Senior Engineer I',
  8: 'Senior Engineer II',
  9: 'Senior Engineer III',
  10: 'Manager',
}
export const TECHNOLOGY_OPTIONS = {
  1: 'Confined Masonry',
  2: 'Timber',
}
export const FLOOR_OPTIONS = {
  1: 'One Floor',
  2: 'Two Floor',
}
export const HOUSE_OPTIONS = {
  1: 'Type 36',
  2: 'Type 45',
  3: 'Type 54',
}
export const BEDROOM36_OPTIONS = {
  1: 'One Bedroom',
  2: 'Two Bedroom',

}
export const BEDROOM45_OPTIONS = {
  1: 'Two Bedroom',
  2: 'Three Bedroom',

}
export const BEDROOM54_OPTIONS = {
  1: 'Three Bedroom',
  2: 'Four Bedroom',

}
export const TOILET_OPTIONS = {
  1: 'Inside',
  2: 'Outside',

}
export const LOTSIZE_OPTIONS = {
  1: '49 m2',
  2: '75 m2',
  3: '88 m2',

}



