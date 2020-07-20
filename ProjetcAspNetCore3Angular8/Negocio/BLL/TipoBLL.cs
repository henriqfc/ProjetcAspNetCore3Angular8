using Microsoft.Extensions.Configuration;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using ProjetcAspNetCore3Angular8.Negocio.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.BLL
{
    public class TipoBLL
    {
        private TipoDAO _dao;
        public TipoBLL()
        {
            _dao = new TipoDAO();
        }
        public IEnumerable<Tipo> GetAll()
        {
            return _dao.GetAll();
        }
        public Tipo Get(int id)
        {
            return _dao.Get(id);
        }
        public long Insert(Tipo i)
        {
            return _dao.Insert(i);
        }
        public long Delete(Tipo i)
        {
            if (_dao.Get(i.idTipo) != null)
            {
                return _dao.Delete(i);
            }
            else
            {
                return 0;
            }
        }
        public bool Update(Tipo i)
        {
            if (_dao.Get(i.idTipo) != null)
            {
                return _dao.Update(i);
            } else
            {
                return false;
            }
        }
    }
}
