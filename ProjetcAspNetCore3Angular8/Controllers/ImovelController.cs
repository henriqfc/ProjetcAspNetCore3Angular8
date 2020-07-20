using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ProjetcAspNetCore3Angular8.Negocio.BLL;
using ProjetcAspNetCore3Angular8.Negocio.Models;
using ProjetcAspNetCore3Angular8.ViewModel;

namespace ProjetcAspNetCore3Angular8.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class ImovelController : ControllerBase
    {
        private ImovelBLL _imovelBLL;
        private EnderecoBLL _enderecoBLL;

        [Route("api/[controller]/GetAll")]
        [HttpPost]
        public IEnumerable<Imovel> GetAll([FromBody] FiltroViewModel filtro)
        {
            _imovelBLL = new ImovelBLL();
            var imoveis = _imovelBLL.GetAll(filtro);
            
            return imoveis.ToArray();
        }
        [Route("api/[controller]/Get")]
        [HttpGet]
        public Imovel Get(int id)
        {
            _imovelBLL = new ImovelBLL();
            return _imovelBLL.Get(id);
        }
        [Route("api/[controller]/Insert")]
        [HttpPost]
        public long Insert(ImovelViewModel i)
        {
            
            _imovelBLL = new ImovelBLL();
            _enderecoBLL = new EnderecoBLL();
            if (i.idEndereco == 0)
            {
                long e = _enderecoBLL.Insert(RetornarEndereco(i.Endereco));
                i.idEndereco = (int) e;
            }
            return _imovelBLL.Insert(i);
        }
        private static Endereco RetornarEndereco(EnderecoViewModel Endereco)
        {
            return Endereco;
        }
        [Route("api/[controller]/Update")]
        [HttpPut]
        public bool Update([FromBody] ImovelViewModel i)
        {
            _imovelBLL = new ImovelBLL();
            var imovelAntigo = _imovelBLL.Get(i.idImovel);
            if (imovelAntigo.idEndereco != i.idEndereco)
            {
                _enderecoBLL = new EnderecoBLL();
                if (_enderecoBLL.Get(i.idEndereco) == null)
                {
                    _enderecoBLL.Insert(i.Endereco);
                }
            }
            
            return _imovelBLL.Update(i);
        }
        [Route("api/[controller]/Delete")]
        [HttpDelete]
        public bool Delete(int id)
        {
            _imovelBLL = new ImovelBLL();
            var e = _imovelBLL.Get(id);
            var files = _imovelBLL.GetImagens(e.idImovel).ToList();
            foreach(var f in files){
                DeleteFIle(f);
            }
            return _imovelBLL.Delete(e);
        }

        [Route("api/[controller]/UploadFile")]
        [HttpPost]
        public async Task<bool> UploadFile([FromForm] IFormFile file, [FromForm] int idImovel)
        {
            _imovelBLL = new ImovelBLL();
            try
            {
                if (file.Length > 0)
                {
                    
                    var filePath = Directory.GetCurrentDirectory();
                    string filePathSalvar = "Resources\\img\\idImovel-" + idImovel;
                    filePath += "\\" + filePathSalvar;
                    DirectoryInfo di = Directory.CreateDirectory(filePath);

                    using (var stream = new FileStream(filePath + "\\" + file.FileName, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                        ImagensImovel ii = new ImagensImovel();
                        ii.dataInsert = DateTime.Now;
                        ii.idImovelImagem = idImovel;
                        ii.name = file.FileName;
                        ii.path = filePathSalvar + "\\" + ii.name;
                        _imovelBLL.InsertFile(ii);
                    }
                    return true;
                }
                return false;
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("api/[controller]/DeleteFile")]
        [HttpPost]
        public bool DeleteFile([FromBody] ImagensImovel file)
        {
            _imovelBLL = new ImovelBLL();
            try
            {
                DeleteFIle(file);
                _imovelBLL.DeleteFile(file);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        void DeleteFIle(ImagensImovel file)
        {
            _imovelBLL.DeleteFile(file);
            var filePath = Directory.GetCurrentDirectory();
            filePath += "\\" + file.path;
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
        [Route("api/[controller]/GetFiles")]
        [HttpGet]
        public IEnumerable<ImagensImovel> GetFiles(int id)
        {
            try
            {
                _imovelBLL = new ImovelBLL();
                return _imovelBLL.GetImagens(id).ToArray();
            } catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
