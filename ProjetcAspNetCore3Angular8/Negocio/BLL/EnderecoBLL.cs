using Microsoft.Extensions.Configuration;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using ProjetcAspNetCore3Angular8.Negocio.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.BLL
{
    public class EnderecoBLL
    {
        private EnderecoDAO _dao;
        public EnderecoBLL()
        {
            _dao = new EnderecoDAO();
        }
        public IEnumerable<Endereco> GetAll()
        {
            return _dao.GetAll();
        }
        public Endereco Get(int id)
        {
            return _dao.Get(id);
        }
        public long Insert(Endereco i)
        {
            return _dao.Insert(i);
        }
        public long Delete(Endereco i)
        {
            if (_dao.Get(i.idEndereco) != null)
            {
                return _dao.Delete(i);
            }
            else
            {
                return 0;
            }
        }
        public bool Update(Endereco i)
        {
            if (_dao.Get(i.idEndereco) != null)
            {
                return _dao.Update(i);
            } else
            {
                return false;
            }
        }
    }
}
