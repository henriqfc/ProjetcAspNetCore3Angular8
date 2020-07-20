using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.ViewModel
{
    public class EnderecoViewModel : IEndereco
    {
        public int idEndereco { get; set; }
        public string cep { get; set; }
        public string rua { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string uf { get; set; }
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }
    }
}
