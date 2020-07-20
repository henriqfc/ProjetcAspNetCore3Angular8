using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ProjetcAspNetCore3Angular8.Negocio.BLL;
using ProjetcAspNetCore3Angular8.Negocio.Models;

namespace ProjetcAspNetCore3Angular8.Controllers
{
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private EnderecoBLL _EnderecoBLL;
        [Route("api/[controller]/GetAll")]
        [HttpGet]
        public IEnumerable<Endereco> GetAll()
        {
            _EnderecoBLL = new EnderecoBLL();
            return _EnderecoBLL.GetAll().ToArray();
        }
        [Route("api/[controller]/Get")]
        [HttpGet]
        public Endereco Get(int id)
        {
            _EnderecoBLL = new EnderecoBLL();
            return _EnderecoBLL.Get(id);
        }

        [Route("api/[controller]/Insert")]
        [HttpPost]
        public long Post([FromBody] Endereco i)
        {
            _EnderecoBLL = new EnderecoBLL();
            return _EnderecoBLL.Insert(i);
        }

        [Route("api/[controller]/Update")]
        [HttpPut]
        public bool Put(int id, [FromBody] Endereco i)
        {
            try
            {
                _EnderecoBLL = new EnderecoBLL();
                return _EnderecoBLL.Update(i);
            } catch(Exception ex)
            {
                throw ex;
            }
            
        }

        [Route("api/[controller]/Delete")]
        [HttpDelete]
        public long Delete(int id)
        {
            try
            {
                _EnderecoBLL = new EnderecoBLL();
                var e = _EnderecoBLL.Get(id);
                return _EnderecoBLL.Delete(e);
            } catch (Exception ex)
            {
                throw ex;
            }
            
        }


        [Route("api/[controller]/BuscarCEP")]
        [HttpGet]
        public async Task<Endereco> BuscarCEP(string cep)
        {
            try
            {
                _EnderecoBLL = new EnderecoBLL();
                string url = "https://viacep.com.br/ws/" + cep + "/json";
                Endereco e = new Endereco();
                using (var cliente = new HttpClient())
                {
                    HttpResponseMessage resposta = await cliente.GetAsync(url);
                    string json = await resposta.Content.ReadAsStringAsync();
                    var js = JsonConvert.DeserializeObject<dynamic>(json);
                    string cp = js["cep"].ToString().Replace("-", "");

                    var endCadastrado = _EnderecoBLL.GetAll().Where(c => c.cep == cp).FirstOrDefault();

                    if (endCadastrado != null)
                    {
                        e = endCadastrado;
                    }
                    else
                    {
                        e.cep = cp;
                        e.rua = js["logradouro"].ToString();
                        e.bairro = js["bairro"].ToString();
                        e.cidade = js["localidade"].ToString();
                        e.uf = js["uf"].ToString();
                    }

                }

                return e;
            } catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
