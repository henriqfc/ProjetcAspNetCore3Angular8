using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using ProjetcAspNetCore3Angular8.Negocio.DAO;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Repository
{
    public class EnderecoDAO
    {

        public IEnumerable<Endereco> GetAll()
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.GetAll<Endereco>();
            }
        }
        public int GetLastId(MySqlConnection conexao)
        {
            var all = conexao.GetAll<Endereco>().ToList();
            if (all.Count > 0)
            {
                return all.Max(e => e.idEndereco);
            }
            else
            {
                return 0;
            }
        }
        public Endereco Get(int id)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Get<Endereco>(id);
            }
        }

        public long Insert(Endereco Endereco)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                Endereco.ativo = true;
                Endereco.dataInsert = DateTime.Now;
                Endereco.idEndereco = GetLastId(conexao) + 1;
                return conexao.Insert(Endereco);
            }
        }
        public bool Update(Endereco Endereco)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Update(Endereco);
            }
        }

        public long Delete(Endereco Endereco)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Insert(Endereco);
            }
        }
    }
}
