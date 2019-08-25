import Realm from 'realm';

class Categoria extends Realm.Object {}
Categoria.schema = {
  name: 'Categoria',
  primaryKey: 'id',
  properties: {
    id: 'int',
    descricao: 'string',
    status: 'bool'
  }
};

class Cliente extends Realm.Object {}
Cliente.schema = {
  name: 'Cliente',
  primaryKey: 'id',
  properties: {
    id: 'int',
    nome: 'string',
    cpf: 'string',
    celular: 'string',
    status: 'bool'
  }
};

class Produto extends Realm.Object {}
Produto.schema = {
  name: 'Produto',
  primaryKey: 'id',
  properties: {
    id: 'int',
    descricao: 'string',
    valor: 'float',
    categoria: 'int',
    unidade:'string',
    quantidade:'float',
    status: 'bool'
  }
};

const RealmInstance = new Realm({ schema: [Categoria, Cliente, Produto] });
export default RealmInstance;