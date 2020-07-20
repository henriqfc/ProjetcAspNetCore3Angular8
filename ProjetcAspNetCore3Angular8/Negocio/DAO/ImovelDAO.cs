using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using ProjetcAspNetCore3Angular8.Negocio.DAO;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using ProjetcAspNetCore3Angular8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Repository
{
    public class ImovelDAO
    {


        public IEnumerable<Imovel> GetAll(FiltroViewModel filtro)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                var imoveis = conexao.GetAll<Imovel>();
                if (filtro.idTipo != null)
                {
                    imoveis = imoveis.Where(i => i.idTipo == filtro.idTipo.Value);
                }
                if (!String.IsNullOrEmpty(filtro.Endereco))
                {
                    var enderecos = conexao.GetAll<Endereco>().Where(e => filtro.Endereco.Contains(e.bairro) ||
                    filtro.Endereco.Contains(e.cep) || filtro.Endereco.Contains(e.cidade) ||
                    filtro.Endereco.Contains(e.rua) ).ToList();
                    imoveis = imoveis.Where(i => enderecos.Where(e => e.idEndereco == i.idEndereco).FirstOrDefault() != null);
                }
                if (!string.IsNullOrEmpty(filtro.tipoValor))
                {
                    if (filtro.tipoValor == "C")
                    {
                        imoveis = imoveis.Where(i => i.valorVenda.HasValue);
                    } else if (filtro.tipoValor == "A")
                    {
                        imoveis = imoveis.Where(i => i.valorAluguel.HasValue);
                    }
                }
                if (filtro.numQuartos.HasValue)
                {
                    imoveis = imoveis.Where(i => i.numQuartos == filtro.numQuartos.Value);
                }
                if (filtro.PrecoInicialComprar.HasValue)
                {
                    imoveis = imoveis.Where(i => i.valorVenda.Value >= filtro.PrecoInicialComprar.Value);
                }
                if (filtro.PrecoFinalComprar.HasValue)
                {
                    imoveis = imoveis.Where(i => i.valorVenda.Value <= filtro.PrecoFinalComprar.Value);
                }
                if (filtro.PrecoInicialAlugar.HasValue)
                {
                    imoveis = imoveis.Where(i => i.valorAluguel.Value >= filtro.PrecoInicialAlugar.Value);
                }
                if (filtro.PrecoFinalAlugar.HasValue)
                {
                    imoveis = imoveis.Where(i => i.valorAluguel.Value <= filtro.PrecoFinalAlugar.Value);
                }
                return imoveis;
            }
        }
        internal void InsertFile(ImagensImovel file)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                file.dataInsert = DateTime.Now;
                file.idImagensImovel = GetLastIdImagem(conexao) + 1;
                conexao.Insert(file);
            }
        }
        internal void DeleteFile(ImagensImovel file)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                conexao.Delete(file);
            }
        }

        public Imovel Get(int id)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Get<Imovel>(id);
            }
        }
        public int GetLastId(MySqlConnection conexao)
        {
            var all = conexao.GetAll<Imovel>().ToList();
            if (all.Count > 0)
            {
                return all.Max(e => e.idImovel);
            } else
            {
                return 0;
            }
        }
        public int GetLastIdImagem(MySqlConnection conexao)
        {
            var all = conexao.GetAll<ImagensImovel>().ToList();
            if (all.Count > 0)
            {
                return all.Max(e => e.idImagensImovel);
            }
            else
            {
                return 0;
            }
        }
        public long Insert(Imovel imovel)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                imovel.ativo = true;
                imovel.dataInsert = DateTime.Now;
                imovel.idImovel = GetLastId(conexao) + 1;
                return conexao.Insert(imovel);
            }
        }
        public bool Update(Imovel imovel)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                imovel.dataUpdate = DateTime.Now;
                return conexao.Update(imovel);
            }
        }

        public bool Delete(Imovel imovel)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                var imagens = conexao.GetAll<ImagensImovel>().Where(ii => ii.idImovelImagem == imovel.idImovel).ToList();
                foreach (var i in imagens)
                {
                    conexao.Delete(i);
                }
                return conexao.Delete(imovel);
            }
        }
        public IEnumerable<ImagensImovel> GetImagens(int idImovel)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.GetAll<ImagensImovel>().Where(i => i.idImovelImagem == idImovel);
            }
        }

    }
}
