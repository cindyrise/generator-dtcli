import mirror from 'mirror-creator';

export const helloType = mirror([
  'GET_HELLO_DATA',
],'hello/');

export const ttlType = mirror([
  'GET_TTL_DATA',
],'ttl/');

export const testPersonType = mirror([
  'GET_TESTPERSON_DATA',
],'testPerson/');

export const persosType = mirror([
  'GET_PERSOS_DATA',
],'persos/');

export const personCenterType = mirror([
  'GET_PERSONCENTER_DATA',
],'personCenter/');

export const testType = mirror([
  'GET_TEST_DATA',
],'test/');


export const globalType = mirror([
  'GET_USER_DATA',
  'GET_NAV_DATA',
],'global/');

export const homeType = mirror([
  'GET_HOME_DATA',
  'GET_USER_DATA',
  'GET_NAV_DATA',
],'home/');


