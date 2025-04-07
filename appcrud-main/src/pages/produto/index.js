import './index.css';
import ProdutoService from '../../service/produto-service';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Produtos from '../../models/produto';

function ProdutoPage() {

  const [produtos, setProdutos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produto, setProduto] = useState(new Produtos());
  

  useEffect(() => {

    ProdutoService.obter()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoEdicao(true);
    let produtoEncontrado = produtos.find(c => c.id == e.target.id);
    produtoEncontrado.dataCadastro = produtoEncontrado.dataCadastro.substring(0,10);

    setProduto(produtoEncontrado);
  
  }

  const excluir = (e) => {

    let produtoEncontrado = produtos.find(c => c.id == e.target.id);

    Swal.fire({
      title: 'Deseja realmente excluir o produto?',
      text: `produto: ${produtoEncontrado.nome}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        excluirProdutoBackEnd(produtoEncontrado.id);
      }
    });
  };
  const adicionar = () => {
    setModoEdicao(false);
  };

  const atualizarProdutoNaTabela = (produtoAtualizado, removerProduto = false) =>{
    let indice = produtos.findIndex((produto) => produto.id === produtoAtualizado.id);

    (removerProduto) 
        ? produtos.splice(indice, 1)
        : produtos.splice(indice, 1, produto);

    setProdutos(arr => [...arr]);
  }

  const salvar = () => {

    if (!produto.nome || !produto.valor ) {
      Swal.fire({
        icon: 'error',
        text: 'E-mail e CPF são obrigatórios.'
      });
      return;
    }

    (modoEdicao) ? atualizarProdutoBackend(produto) : adicionarProdutoBackend(produto);
  };

  const adicionarProdutoBackend = (produto) => {
    ProdutoService.adicionar(produto)
      .then(response => {

        setProdutos(lista => [...lista, new Produtos(response.data)]);

        limparProduto();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 4500
        });

      })
      .catch(erro => {

      })
  }

  const atualizarProdutoBackend = (produto) => {
    ProdutoService.atualizar(produto)
    .then(response => {

      atualizarProdutoNaTabela(response.data);

     
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Produto atualizado com sucesso!',
        showConfirmButton: false,
        timer: 4500
      });

    })
    .catch(erro => {

    })
  }

  const excluirProdutoBackEnd = (id) => {
    ProdutoService.excluir(id)
    .then(() => {
      let produtoEncontrado = produtos.find(c => c.id == id);

      atualizarProdutoNaTabela(produtoEncontrado, true);
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Produto excluido com sucesso!',
        showConfirmButton: false,
        timer: 4500
      });

    })
    .catch();
  }

  const limparProduto = () => {
    setProduto({
      ...produto,
      id: '',
      nome: '',
      valor: '',
      dataCadastro: '',
      
    });
  }

  return (
    <div className="container">

     
      <div className="row mt-3">
        <div className="col-sm-12">
          <h4>Produtos</h4>
          <hr />
        </div>
      </div>

     
      <div className="row">
        <div className="col-sm-3">
          <button
            id="btn-adicionar"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal" data-bs-target="#modal-produto"
            onClick={adicionar}
          >
        Adicionar
          </button>
        </div>
      </div>

   
      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>valor</th>
                <th>Cadastro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {produtos.map(produto => (
                <tr>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.valor}</td>
                  <td>{new Date(produto.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button

                      id={produto.id}
                      onClick={editar}
                      class="btn btn-outline-primary btn-sm mr-3"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-produto">
                      Editar
                    </button>
                    <button
                      id={produto.id}
                      onClick={excluir} 
                      class="btn btn-outline-primary btn-sm espacar">
                     Excluir
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

     
      <div className="row">
     
        <div className="modal fade modal-lg" id="modal-produto">
          <div className="modal-dialog">
            <div className="modal-content">

           
              <div className="modal-header">
                <h4 className="modal-title">{modoEdicao ? "Editar produto" : "Adicionar produto"}</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

             
              <div className="modal-body">

                <div className="row">
                  <div className="col-sm-2">
                    <label for="id" className="form-label">Id</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="id"
                      value={produto.id}
                   
                      onChange={(e) => setProduto({ ...produto, id: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-10">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome"
                      value={produto.nome}
                      onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <label for="email" className="form-label">valor</label>
                    <input type="text" className="form-control" id="email"
                      value={produto.valor}
                      onChange={(e) => setProduto({ ...produto, valor: e.target.value })} />
                  </div>
                 
                 
                  <div className="col-sm-3">
                    <label for="dataCadastro" className="form-label">Data de cadastro</label>
                    <input type="date" className="form-control" id="dataCadastro" disabled
                      value={produto.dataCadastro}
                      onChange={(e) => setProduto({ ...produto, dataCadastro: e.target.value })} />
                  </div>
                </div>

              </div>

            
              <div className="modal-footer">
                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar} >Salvar</button>
                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProdutoPage;