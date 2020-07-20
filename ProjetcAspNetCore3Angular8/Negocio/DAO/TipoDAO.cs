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
    public class TipoDAO
    {

     
        public IEnumerable<Tipo> GetAll()
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.GetAll<Tipo>();
            }
        }
        public Tipo Get(int id)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Get<Tipo>(id);
            }
        }

        public long Insert(Tipo Tipo)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Insert(Tipo);
            }
        }
        public bool Update(Tipo Tipo)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Update(Tipo);
            }
        }

        public long Delete(Tipo Tipo)
        {
            using (MySqlConnection conexao = new MySqlConnection(
                DBConnection.Configuration.GetConnectionString("imobiliariadb")))
            {
                return conexao.Insert(Tipo);
            }
        }
    }
}
