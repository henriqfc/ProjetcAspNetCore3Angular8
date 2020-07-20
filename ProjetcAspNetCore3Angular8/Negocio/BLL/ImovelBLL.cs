using Microsoft.Extensions.Configuration;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using ProjetcAspNetCore3Angular8.Negocio.Repository;
using ProjetcAspNetCore3Angular8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.BLL
{
    public class ImovelBLL
    {
        private ImovelDAO _dao;
        public ImovelBLL()
        {
            _dao = new ImovelDAO();
        }
        public IEnumerable<Imovel> GetAll(FiltroViewModel filtro)
        {
            return _dao.GetAll(filtro);
        }
        public Imovel Get(int id)
        {
            return _dao.Get(id);
        }
        public long Insert(Imovel i)
        {
            return _dao.Insert(i);
        }
        public bool Delete(Imovel i)
        {
            if (_dao.Get(i.idImovel) != null)
            {
                return _dao.Delete(i);
            }
            else
            {
                return false;
            }
        }
        public bool Update(Imovel i)
        {
            if (_dao.Get(i.idImovel) != null)
            {
                return _dao.Update(i);
            } else
            {
                return false;
            }
        }
        public IEnumerable<ImagensImovel> GetImagens(int idImovel)
        {
            return _dao.GetImagens(idImovel);
        }

        internal void DeleteFile(ImagensImovel file)
        {
            _dao.DeleteFile(file);
        }
        internal void InsertFile(ImagensImovel file)
        {
            _dao.InsertFile(file);
        }
    }
}
