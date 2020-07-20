using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProjetcAspNetCore3Angular8.Negocio.BLL;
using ProjetcAspNetCore3Angular8.Negocio.Models;

namespace ProjetcAspNetCore3Angular8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoController : ControllerBase
    {
        private TipoBLL _TipoBLL;
        
        [HttpGet]
        public IEnumerable<Tipo> GetAll()
        {
            _TipoBLL = new TipoBLL();
            return _TipoBLL.GetAll().ToArray();
        }
        [HttpGet("{id}")]
        public Tipo Get(int id)
        {
            _TipoBLL = new TipoBLL();
            return _TipoBLL.Get(id);
        }

        [HttpPost]
        public long Post([FromBody] Tipo i)
        {
            _TipoBLL = new TipoBLL();
            return _TipoBLL.Insert(i);
        }

        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Tipo i)
        {
            _TipoBLL = new TipoBLL();
            return _TipoBLL.Update(i);
        }
        [HttpDelete("{id}")]
        public long Delete(int id)
        {
            _TipoBLL = new TipoBLL();
            var e = _TipoBLL.Get(id);
            return _TipoBLL.Delete(e);
        }

    }
}
