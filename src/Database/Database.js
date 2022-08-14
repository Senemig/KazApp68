import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Kazapp.db'; //Nome do banco de dados
const database_version = '1.0'; //Versão do banco de dados
const database_displayname = 'KazApp DB'; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class Database {
  Conectar() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Banco de dados Aberto');
              db.executeSql('SELECT 1 FROM Casas LIMIT 1')
                .then(() => {
                  console.log(
                    'O banco de dados está pronto ... Executando Consulta SQL ...',
                  );
                })
                .catch(error => {
                  console.log('Erro Recebido: ', error);
                  console.log(
                    'O Banco de dados não está pronto ... Criando Dados',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Casas (id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'nome VARCHAR(30), ' +
                        'finalidade INTEGER, ' +
                        'endereco VARCHAR(100), ' +
                        'tipo INTEGER, ' +
                        'imagem TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Tabela criada com Sucesso');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              db.executeSql('SELECT 1 FROM Imagens LIMIT 1')
                .then(() => {
                  console.log(
                    'O banco de dados está pronto ... Executando Consulta SQL ...',
                  );
                })
                .catch(error => {
                  console.log('Erro Recebido: ', error);
                  console.log(
                    'O Banco de dados não está pronto ... Criando Dados',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Imagens (id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                        'idCasa TEXT, ' +
                        'imagem TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Tabela criada com Sucesso');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest Falhou - plugin não funcional');
        });
    });
  }

  Desconectar(db) {
    if (db) {
      console.log('Fechando Banco de Dados');
      db.close()
        .then(status => {
          console.log('Banco de dados Desconectado!!');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('A conexão com o banco não está aberta');
    }
  }

  ListarTodos() {
    return new Promise(resolve => {
      const products = [];
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Casas', []).then(([tx, results]) => {
              console.log('Consulta completa');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {id, nome, finalidade, endereco, tipo, imagem} = row;
                products.push({id, nome, finalidade, endereco, tipo, imagem});
              }
              resolve(products);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  ListarImagens(id) {
    return new Promise(resolve => {
      const products = [];
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Imagens WHERE idCasa = ?', [id]).then(
              ([tx, results]) => {
                console.log('Consulta completa');
                var len = results.rows.length;
                console.log(len + ' fotos encontradas!');
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log('item ' + row.id + ' -- ' + row.idCasa);
                  const {id, idCasa, imagem} = row;
                  products.push({id, idCasa, imagem});
                }
                resolve(products);
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  Inserir(prod) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            //Query SQL para inserir um novo produto
            tx.executeSql(
              'INSERT INTO Casas (nome, finalidade, endereco, tipo, imagem) VALUES (?, ?, ?, ?, ?)',
              [
                prod.nome,
                prod.finalidade,
                prod.endereco,
                prod.tipo,
                prod.imagem,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  InserirImagem(prod) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            //Query SQL para inserir um novo produto
            tx.executeSql(
              'INSERT INTO Imagens (idCasa, imagem) VALUES (?, ?)',
              [prod.idCasa, prod.imagem],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
